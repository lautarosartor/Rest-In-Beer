package sesiones

import (
	"bar/constants"
	"bar/database"
	"bar/models"
	"bar/utils"
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

type ResponseMessage struct {
	Status  string `json:"status"`
	Data    Data   `json:"data,omitempty"`
	Message string `json:"message,omitempty"`
	Code    string `json:"code,omitempty"`
}

type Data struct {
	Cliente       *models.Clientes `json:"cliente,omitempty"`
	Sesion        *models.Sesiones `json:"sesion,omitempty"`
	Sesiones      []Sesiones       `json:"sesiones,omitempty"`
	TotalDataSize int64            `json:"totalDataSize,omitempty"`
}

type Sesiones struct {
	models.Sesiones
	Mesa     string `json:"mesa"`
	CodigoQr string `json:"codigo_qr"`
	Creador  string `json:"creador"`
}

type CreateSesion struct {
	CodigoQr string `json:"codigo_qr"`
}

func GetPaginated(c echo.Context) error {
	db := database.GetDb()

	if c.QueryParam("activas") == "SI" {
		db = db.Where("activo = ?", 1)
	}

	db = db.Joins(`
		INNER JOIN mesas ON sesiones.mesa_id = mesas.id
		INNER JOIN clientes ON sesiones.owner_id = clientes.id
	`)

	var totalDataSize int64 = 0
	db.Table("sesiones").Count(&totalDataSize)

	var sesiones []Sesiones
	db.Select(`
		sesiones.*,
		mesas.nombre AS mesa,
		mesas.codigo_qr,
		CONCAT(clientes.nombre, ' ', clientes.apellido) AS creador
	`).
		Scopes(utils.Order(c, "sesiones.activo"), utils.Paginate(c)).
		Find(&sesiones)

	if len(sesiones) == 0 {
		return c.JSON(http.StatusOK, ResponseMessage{
			Status:  "success",
			Message: "Aún no hay sesiones activas hoy.",
		})
	}

	data := Data{Sesiones: sesiones, TotalDataSize: totalDataSize}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Get(c echo.Context) error {
	db := database.GetDb()
	clienteID := utils.GetClientId(c)
	mesaQR := c.QueryParam("mesa")

	// 1. Verificar que la mesa existe
	var mesaID uint
	db.Raw("SELECT id FROM mesas WHERE codigo_qr = ?", mesaQR).Scan(&mesaID)
	if mesaID == 0 {
		return utils.RespondWithError(c, http.StatusBadRequest, "No se pudo encontrar la mesa, volvé a escanear el código QR")
	}

	// 2. Buscar sesión activa en la mesa
	sesion := new(models.Sesiones)
	db.Where("mesa_id = ? AND activo = ?", mesaID, true).Find(&sesion)

	// 3. No hay sesión activa -> mesa disponible
	if sesion.ID == 0 {
		checkout := new(models.CheckoutEstados)
		db.First(&checkout, constants.TABLE_AVAILABLE)
		return c.JSON(http.StatusOK, ResponseMessage{
			Status:  "success",
			Message: *checkout.Descripcion,
			Code:    checkout.Estado,
		})
	}

	// 4. Hay sesión activa -> verificar si el cliente ya está en ella
	var tieneAcceso bool
	db.Raw(`
		SELECT EXISTS (
			SELECT 1 FROM sesiones_clientes
			WHERE sesion_id = ? AND cliente_id = ?
		)
	`, sesion.ID, clienteID).
		Scan(&tieneAcceso)

	// 5. No tiene acceso -> mesa ocupada
	if !tieneAcceso {
		checkout := new(models.CheckoutEstados)
		db.First(&checkout, constants.TABLE_OCCUPIED)
		return c.JSON(http.StatusOK, ResponseMessage{
			Status:  "success",
			Message: *checkout.Descripcion,
			Code:    checkout.Estado,
		})
	}

	// 6. Tiene acceso -> dejarlo pasar con los datos de la sesión
	checkout := new(models.CheckoutEstados)
	db.First(&checkout, constants.ALREADY_IN_SESSION)

	data := Data{Sesion: sesion}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: *checkout.Descripcion,
		Code:    checkout.Estado,
		Data:    data,
	})
}

func Create(c echo.Context) error {
	db := database.GetDb()
	clienteClaim := utils.GetClientClaims(c)

	payload := new(CreateSesion)
	if err := c.Bind(&payload); err != nil {
		return utils.RespondWithError(c, http.StatusBadRequest, "invalid request body: "+err.Error())
	}

	// Validación manual de los campos requeridos
	if payload.CodigoQr == "" {
		return utils.RespondWithError(c, http.StatusBadRequest, "Debes escanear el código QR que está en tu mesa")
	}

	mesa := new(models.Mesas)
	db.Where("codigo_qr = ?", payload.CodigoQr).First(&mesa)
	if mesa.ID == 0 {
		return utils.RespondWithError(c, http.StatusNotFound, "Mesa no encontrada, volvé a escanear el QR")
	}

	// Buscamos si hay una sesion activa en la mesa
	var sesionID uint
	db.Select("id").
		Where(`
			mesa_id = ?
			AND activo = ?
			AND finished_at IS NULL
		`, mesa.ID, true).
		Scan(&sesionID)

	if sesionID != 0 {
		return utils.RespondWithError(c, http.StatusConflict, "Esta mesa ya tiene una sesión activa. Para unirte accedé al siguiente link: (proximamente)")
	}

	tx := db.Begin()
	if err := tx.Error; err != nil {
		return utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Si no esta activa la creamos
	newSesion := &models.Sesiones{
		MesaID:  mesa.ID,
		OwnerID: clienteClaim.ID,
		Activo:  true,
	}

	if err := tx.Create(&newSesion).Error; err != nil {
		tx.Rollback()
		return utils.RespondWithError(c, http.StatusInternalServerError, "Error inesperado al crear la sesión")
	}

	newSesionCliente := &models.SesionesClientes{
		SesionID:  newSesion.ID,
		ClienteID: clienteClaim.ID,
	}

	if err := tx.Create(&newSesionCliente).Error; err != nil {
		tx.Rollback()
		return utils.RespondWithError(c, http.StatusInternalServerError, "Error uniendote a la sesión")
	}

	if err := tx.Commit().Error; err != nil {
		return utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: fmt.Sprintf("¡Bienvenido %s, iniciaste una nueva sesión en la '%s'!", clienteClaim.Name, mesa.Nombre),
	})
}

func Delete(c echo.Context) error {
	db := database.GetDb()
	sesionID := c.Param("id")
	sesion := new(models.Sesiones)

	db.First(&sesion, sesionID)
	if sesion.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Sesión no encontrado.",
		})
	}

	now := time.Now()
	sesion.Activo = false
	sesion.FinishedAt = &now

	if err := db.Save(sesion).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error inesperado al cerrar la sesión.",
		})
	}

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: "¡Sesión cerrada con éxito!",
	})
}

package sesiones

import (
	"bar/database"
	"bar/models"
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

type ResponseMessage struct {
	Status  string `json:"status"`
	Data    Data   `json:"data,omitempty"`
	Message string `json:"message,omitempty"`
}

type Data struct {
	Cliente       *models.Clientes  `json:"cliente,omitempty"`
	Sesion        *models.Sesiones  `json:"sesion,omitempty"`
	Sesiones      []models.Sesiones `json:"sesiones,omitempty"`
	TotalDataSize int64             `json:"totalDataSize,omitempty"`
}

type CreateSesion struct {
	CodigoQr string `json:"codigo_qr"`
	Dni      string `json:"dni"`
}

func GetAll(c echo.Context) error {
	db := database.GetDb()

	if c.QueryParam("activas") == "SI" {
		db = db.Where("activo = ?", 1)
	}

	var totalDataSize int64 = 0
	db.Table("sesiones").Count(&totalDataSize)

	var sesiones []models.Sesiones
	db.Preload("Mesa").Order("finished_at ASC").Find(&sesiones)

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
	mesaQR := c.QueryParam("mesa")
	dni := c.QueryParam("dni")

	var qr string
	db.Raw("SELECT codigo_qr FROM mesas WHERE codigo_qr = ?", mesaQR).Scan(&qr)
	if qr == "" {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "No se pudo encontrar la mesa, volvé a escanear el código QR.",
		})
	}

	cliente := new(models.Clientes)
	db.Where("dni = ?", dni).First(&cliente)
	if cliente.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Cliente no encontrado.",
		})
	}

	sesion := new(models.Sesiones)
	db.Where("idmesa = (SELECT id FROM mesas WHERE codigo_qr = ?)", qr).
		Preload("Mesa").
		Order("id DESC").
		First(&sesion)

	if sesion.ID == 0 {
		return c.JSON(http.StatusOK, ResponseMessage{
			Status:  "success",
			Message: "Creá una sesión e invitá a tus amigos",
		})
	}

	if sesion.Activo {
		var tieneAcceso bool
		db.Raw(`
			SELECT EXISTS (SELECT 1 FROM sesiones_clientes WHERE idsesion = ? AND idcliente = ?)
		`, sesion.ID, cliente.ID).Scan(&tieneAcceso)

		if !tieneAcceso {
			return c.JSON(http.StatusBadRequest, ResponseMessage{
				Status:  "error",
				Message: "Esta mesa ya tiene una sesión activa, solicitá acceso al siguiente link (proximamente).",
			})
		}
	}

	data := Data{Sesion: sesion}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Create(c echo.Context) error {
	db := database.GetDb()

	payload := new(CreateSesion)
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "invalid request body: " + err.Error(),
		})
	}
	fmt.Println("payload: ", payload)

	// Validación manual de los campos requeridos
	if payload.CodigoQr == "" {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "Debes escanear el código QR que está en tu mesa.",
		})
	}

	mesa := new(models.Mesas)
	db.Where("codigo_qr = ?", payload.CodigoQr).First(&mesa)
	if mesa.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Mesa no encontrada, volvé a escanear el QR.",
		})
	}

	// Buscamos el cliente
	cliente := new(models.Clientes)
	db.Where("dni = ?", payload.Dni).First(&cliente)

	if cliente.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Cliente no encontrado.",
		})
	}

	// Buscamos si hay una sesion activa en la mesa
	sesion := new(models.Sesiones)
	db.Where("idmesa = ? AND activo = ? AND finished_at IS NULL", mesa.ID, 1).First(&sesion)

	if sesion.ID != 0 {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "Esta mesa ya tiene una sesión activa. Para unirte accedé al siguiente link: (proximamente).",
		})
	}

	tx := db.Begin()

	// Si no esta activa la creamos
	newSesion := &models.Sesiones{
		MesaID:  mesa.ID,
		OwnerID: cliente.ID,
		Activo:  true,
	}

	if err := tx.Create(&newSesion).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error inesperado al crear la sesión.",
		})
	}

	newSesionCliente := &models.SesionesClientes{
		SesionID:  newSesion.ID,
		ClienteID: cliente.ID,
	}

	if err := tx.Create(&newSesionCliente).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error inesperado.",
		})
	}

	tx.Commit()

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: fmt.Sprintf("¡Bienvenido %s, iniciaste una nueva sesión en la '%s'!", cliente.Nombre, mesa.NombreMesa),
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

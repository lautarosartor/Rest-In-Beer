package mesas

import (
	"bar/database"
	"bar/models"
	"bar/utils"
	"fmt"
	"net/http"

	"github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

type ResponseMessage struct {
	Status  string `json:"status"`
	Data    Data   `json:"data,omitempty"`
	Message string `json:"message,omitempty"`
}

type Data struct {
	Mesas         []Mesas       `json:"mesas,omitempty"`
	Mesa          *models.Mesas `json:"mesa,omitempty"`
	TotalDataSize int64         `json:"totalDataSize,omitempty"`
}

type Mesas struct {
	models.Mesas
	Ocupada bool `json:"ocupada"`
}

func GetAll(c echo.Context) error {
	db := database.GetDb()
	mesaQR := c.QueryParam("mesa")

	if mesaQR != "" {
		db = db.Where("codigo_qr = ?", c.QueryParam("mesa"))
	}

	var totalDataSize int64 = 0
	db.Table("mesas").Count(&totalDataSize)

	if c.QueryParam("q") != "" {
		db = db.Where("(nombre_mesa LIKE ?)", "%"+c.QueryParam("q")+"%")
	}

	var mesas []Mesas
	db.Select(`
		mesas.*,
		COALESCE(sesiones.activo, FALSE) AS 'ocupada'
	`).
		Joins(`
			LEFT JOIN sesiones
				ON sesiones.idmesa = mesas.id
				AND sesiones.activo = true
		`).
		Order("nombre_mesa ASC").
		Find(&mesas)

	data := Data{Mesas: mesas, TotalDataSize: totalDataSize}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Get(c echo.Context) error {
	db := database.GetDb()
	mesaID := c.Param("id")
	mesa := new(models.Mesas)

	db.First(&mesa, mesaID)
	if mesa.ID == 0 {
		return utils.RespondWithError(c, http.StatusNotFound, "Mesa no encontrada.")
	}

	data := Data{Mesa: mesa}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Create(c echo.Context) error {
	db := database.GetDb()
	payload := new(models.Mesas)

	if err := c.Bind(&payload); err != nil {
		return utils.RespondWithError(c, http.StatusBadRequest, "invalid request body: "+err.Error())
	}

	// Validación manual de los campos requeridos
	if payload.NombreMesa == "" || payload.Capacidad == 0 {
		return utils.RespondWithError(c, http.StatusBadRequest, "El nombre de la mesa y la capacidad son obligatorios.")
	}

	newMesa := &models.Mesas{
		NombreMesa:  payload.NombreMesa,
		Capacidad:   payload.Capacidad,
		CodigoQR:    utils.GenerateRandomCode(10),
		Descripcion: payload.Descripcion,
	}

	// Creamos la mesa
	if err := db.Create(&newMesa).Error; err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			return utils.RespondWithError(c, http.StatusBadRequest, fmt.Sprintf("Ya existe una mesa con el mismo nombre: '%v'.", newMesa.NombreMesa))
		} else {
			return utils.RespondWithError(c, http.StatusInternalServerError, "Error inesperado al crear la mesa.")
		}
	}

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: "¡Mesa creada con éxito!",
	})
}

func Update(c echo.Context) error {
	db := database.GetDb()
	mesaID := c.Param("id")
	request := new(models.Mesas)

	if err := c.Bind(&request); err != nil {
		return utils.RespondWithError(c, http.StatusBadRequest, "invalid request body: "+err.Error())
	}

	// Buscamos si la mesa existe
	mesa := new(models.Mesas)
	db.First(&mesa, mesaID)
	if mesa.ID == 0 {
		return utils.RespondWithError(c, http.StatusNotFound, "Mesa no encontrada.")
	}

	if err := db.Where("id = ?", mesa.ID).Updates(&request).Error; err != nil {
		return utils.RespondWithError(c, http.StatusInternalServerError, "Error inesperado al actualizar la mesa.")
	}

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: "¡Mesa actualizada con éxito!",
	})
}

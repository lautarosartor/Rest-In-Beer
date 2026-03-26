package clientes

import (
	"bar/database"
	"bar/models"
	"bar/routes/middleware"
	"bar/utils"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ResponseMessage struct {
	Status  string `json:"status"`
	Data    Data   `json:"data,omitempty"`
	Message string `json:"message,omitempty"`
}

type Data struct {
	Cliente       *models.Clientes  `json:"cliente,omitempty"`
	Clientes      []models.Clientes `json:"clientes,omitempty"`
	ClientToken   string            `json:"client_token,omitempty"`
	TotalDataSize int64             `json:"totalDataSize,omitempty"`
}

func GetAll(c echo.Context) error {
	db := database.GetDb()

	var totalDataSize int64 = 0
	var clientes []models.Clientes

	db.Joins(`
		JOIN sesiones
		ON clientes.idsesion = sesiones.id
		AND activo = ?`, 1).
		Preload("Sesion.Mesa").
		Preload("Rol").
		Find(&clientes).
		Count(&totalDataSize)

	if totalDataSize == 0 {
		return c.JSON(http.StatusOK, ResponseMessage{
			Status:  "success",
			Message: "Aún no hay clientes con sesiones activas",
		})
	}

	data := Data{Clientes: clientes, TotalDataSize: totalDataSize}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Get(c echo.Context) error {
	db := database.GetDb()
	clienteID := c.Param("id")
	cliente := new(models.Clientes)

	db.Preload("Sesion.Mesa").Preload("Rol").First(&cliente, clienteID)

	data := Data{Cliente: cliente}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Create(c echo.Context) error {
	db := database.GetDb()

	payload := new(models.Clientes)
	if err := c.Bind(&payload); err != nil {
		return utils.RespondWithError(c, http.StatusBadRequest, "invalid request body: "+err.Error())
	}

	clienteEncontrado := new(models.Clientes)
	db.Table("clientes").Where("dni = ?", payload.Dni).Scan(&clienteEncontrado)

	tx := db.Begin()
	if err := tx.Error; err != nil {
		return utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if clienteEncontrado.Dni != "" {
		if err := tx.Where("id = ?", clienteEncontrado.ID).Omit("Dni").Updates(&payload).Error; err != nil {
			tx.Rollback()
			return utils.RespondWithError(c, http.StatusInternalServerError, "Error al actualizar tus datos.")
		}
	} else {
		clienteEncontrado.Nombre = payload.Nombre
		clienteEncontrado.Apellido = payload.Apellido
		clienteEncontrado.Dni = payload.Dni
		clienteEncontrado.Color = payload.Color
		if err := tx.Create(&clienteEncontrado).Error; err != nil {
			tx.Rollback()
			return utils.RespondWithError(c, http.StatusInternalServerError, "Error al guardar tus datos.")
		}
	}

	if err := tx.Commit().Error; err != nil {
		return utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
	}

	token, err := middleware.GenerarClientToken(
		clienteEncontrado.ID,
		clienteEncontrado.Nombre+" "+clienteEncontrado.Apellido,
		clienteEncontrado.Dni,
		payload.Color,
	)
	if err != nil {
		return err
	}

	data := Data{ClientToken: token}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: fmt.Sprintf("%s, tus datos fueron guardados correctamente.", clienteEncontrado.Nombre),
		Data:    data,
	})
}

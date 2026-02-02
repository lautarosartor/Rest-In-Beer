package pedidos

import (
	"bar/constants"
	"bar/database"
	"bar/models"
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
	Pedido        *models.Pedidos       `json:"pedido,omitempty"`
	Pedidos       []models.Pedidos      `json:"pedidos,omitempty"`
	PedidoItems   []models.PedidosItems `json:"items,omitempty"`
	TotalDataSize int64                 `json:"totalDataSize,omitempty"`
}

type PedidoRequest struct {
	models.Pedidos
	Items []models.PedidosItems `json:"items" gorm:"-"`
	Dni   string                `json:"dni"`
}

func GetAllPaginated(c echo.Context) error {
	db := database.GetDb()

	var totalDataSize int64 = 0
	var pedidos []models.Pedidos

	db.Preload("Sesion.Mesa").Preload("Estado").Preload("Items.Producto").Find(&pedidos).Count(&totalDataSize)

	if len(pedidos) == 0 {
		return c.JSON(http.StatusOK, ResponseMessage{
			Status:  "success",
			Message: "Aún no hay pedidos hoy.",
		})
	}

	data := Data{Pedidos: pedidos, TotalDataSize: totalDataSize}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Get(c echo.Context) error {
	db := database.GetDb()
	pedidoID := c.Param("id")
	pedido := new(models.Pedidos)

	db.Preload("Sesion.Mesa").Preload("Estado").First(&pedido, pedidoID)
	if pedido.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Pedido no encontrado.",
		})
	}

	data := Data{Pedido: pedido}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Create(c echo.Context) error {
	db := database.GetDb()
	payload := new(PedidoRequest)

	// Bindeamos el payload (recibimos el dni, idsesion, y los items[])
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "Invalid request body: " + err.Error(),
		})
	}

	var clienteID uint
	db.Select("id").Where("dni = ?", payload.Dni).Table("clientes").Scan(&clienteID)
	if clienteID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Cliente no encontrado.",
		})
	}

	// Verificamos que la sesion aún esté activa
	sesion := new(models.Sesiones)
	db.Where("activo = ?", 1).First(&sesion, payload.SesionID)
	if sesion.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Sesión no encontrada.",
		})
	}

	// Chequeamos que el cliente este vinculado a la sesion
	var puedePedir bool
	db.Raw("SELECT EXISTS (SELECT 1 FROM sesiones_clientes WHERE idsesion = ? AND idcliente = ?)",
		payload.SesionID, clienteID).Scan(&puedePedir)

	if !puedePedir {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Cliente no autorizado en la mesa.",
		})
	}

	newPedido := &models.Pedidos{
		SesionID:  payload.SesionID,
		ClienteID: clienteID,
		EstadoID:  constants.PREPARACION,
	}

	tx := db.Begin()

	// Creamos el pedido
	if err := tx.Create(&newPedido).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error al realizar el pedido.",
		})
	}

	// Procesamos los items
	var totalPedido float64
	var newItems []models.PedidosItems

	for _, item := range payload.Items {
		producto := new(models.Productos)
		if err := tx.First(&producto, item.ProductoID).Error; err != nil {
			tx.Rollback()
			return c.JSON(http.StatusNotFound, ResponseMessage{
				Status:  "error",
				Message: fmt.Sprintf("No se encontro el producto con ID %v.", item.ProductoID),
			})
		}

		// Creamos un nuevo item en el pedido
		newItem := &models.PedidosItems{
			PedidoID:   newPedido.ID,
			ProductoID: producto.ID,
			Cantidad:   item.Cantidad,
			Subtotal:   producto.Precio * float64(item.Cantidad),
		}
		totalPedido += newItem.Subtotal
		newItems = append(newItems, *newItem)
	}

	if err := tx.Create(&newItems).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error al procesar los productos.",
		})
	}

	newPedido.Total = totalPedido
	if err := tx.Updates(&newPedido).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error al guardar el total del pedido.",
		})
	}

	tx.Commit()

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: "¡Pedido realizado con éxito!.",
	})
}

func GetAllPublic(c echo.Context) error {
	db := database.GetDb()
	sesionID := c.Param("id")

	db = db.Where("idsesion = ?", sesionID)

	var totalDataSize int64
	db.Table("pedidos").Count(&totalDataSize)

	var pedidos []models.Pedidos
	db.Preload("Cliente").
		Preload("Estado").
		Preload("Items.Producto").
		Find(&pedidos)

	data := Data{Pedidos: pedidos}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

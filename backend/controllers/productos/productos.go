package productos

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
	Producto      *models.Productos `json:"producto,omitempty"`
	Productos     []Productos       `json:"productos,omitempty"`
	TotalDataSize int64             `json:"totalDataSize,omitempty"`
}

type Productos struct {
	models.Productos
	Subcategoria string `json:"subcategoria"`
	CategoriaID  uint   `json:"categoria_id"`
	Categoria    string `json:"categoria"`
}

func GetPaginated(c echo.Context) error {
	db := database.GetDb()

	db = db.Joins(`
		INNER JOIN subcategorias ON productos.subcategoria_id = subcategorias.id
		INNER JOIN categorias ON subcategorias.categoria_id = categorias.id
	`)

	var totalDataSize int64 = 0
	db.Table("productos").Count(&totalDataSize)

	var productos []Productos
	db.Select(`
		productos.*,
		subcategorias.nombre AS subcategoria,
		categorias.id AS categoria_id,
		categorias.nombre AS categoria
	`).
		Scopes(utils.Order(c, "productos.id"), utils.Paginate(c)).
		Find(&productos)

	data := Data{Productos: productos, TotalDataSize: totalDataSize}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Get(c echo.Context) error {
	db := database.GetDb()
	productoID := c.Param("id")
	producto := new(models.Productos)

	db.Preload("Subcategoria").First(&producto, productoID)
	if producto.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Producto no encontrado.",
		})
	}

	data := Data{Producto: producto}
	return c.JSON(http.StatusOK, ResponseMessage{
		Status: "success",
		Data:   data,
	})
}

func Create(c echo.Context) error {
	db := database.GetDb()
	payload := new(models.Productos)

	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "Invalid request body: " + err.Error(),
		})
	}

	// Validación manual de los campos requeridos
	if payload.Nombre == "" || payload.Precio < 0 || payload.Stock < 0 {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "El nombre del producto, el precio y el stock son requeridos.",
		})
	}

	newProducto := &models.Productos{
		SubcategoriaID: payload.SubcategoriaID,
		Nombre:         payload.Nombre,
		Descripcion:    payload.Descripcion,
		Precio:         payload.Precio,
		Stock:          payload.Stock,
		ImgUrl:         payload.ImgUrl,
	}

	// Creamos el producto
	if err := db.Create(&newProducto).Error; err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			return c.JSON(http.StatusBadRequest, ResponseMessage{
				Status:  "error",
				Message: fmt.Sprintf("Ya posees el producto '%v'.", newProducto.Nombre),
			})
		} else {
			return c.JSON(http.StatusInternalServerError, ResponseMessage{
				Status:  "error",
				Message: "Error inesperado al crear el producto.",
			})
		}
	}

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: "¡Producto creado con éxito!.",
	})
}

func Update(c echo.Context) error {
	db := database.GetDb()
	productoID := c.Param("id")
	request := new(models.Productos)

	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, ResponseMessage{
			Status:  "error",
			Message: "Invalid request body: " + err.Error(),
		})
	}

	// Buscamos si la mesa existe
	producto := new(models.Productos)
	db.First(&producto, productoID)
	if producto.ID == 0 {
		return c.JSON(http.StatusNotFound, ResponseMessage{
			Status:  "error",
			Message: "Producto no encontrado.",
		})
	}

	if err := db.Where("id = ?", producto.ID).Updates(&request).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, ResponseMessage{
			Status:  "error",
			Message: "Error inesperado al actualizar el producto.",
		})
	}

	return c.JSON(http.StatusOK, ResponseMessage{
		Status:  "success",
		Message: "¡Producto actualizado con éxito!.",
	})
}

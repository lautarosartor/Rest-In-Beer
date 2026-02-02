package models

import "time"

type Productos struct {
	ID             uint      `json:"id" gorm:"primary_key"`
	SubcategoriaID *uint     `json:"subcategoria_id"`
	Nombre         string    `json:"nombre"`
	Descripcion    *string   `json:"descripcion"`
	Precio         float64   `json:"precio"`
	Stock          int       `json:"stock"`
	ImgUrl         *string   `json:"img_url"`
	CreatedAt      time.Time `json:"created_at"`
}

func (Productos) TableName() string {
	return "productos"
}

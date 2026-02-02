package models

import "time"

type Pedidos struct {
	ID          uint       `json:"id" gorm:"primary_key"`
	SesionID    uint       `json:"sesion_id"`
	ClienteID   uint       `json:"cliente_id"`
	EstadoID    uint       `json:"estado_id"`
	Total       float64    `json:"total"`
	CreatedAt   time.Time  `json:"created_at"`
	DeliveredAt *time.Time `json:"delivered_at"`
}

func (Pedidos) TableName() string {
	return "pedidos"
}

type PedidosItems struct {
	ID         uint    `json:"id" gorm:"primary_key"`
	PedidoID   uint    `json:"pedido_id"`
	ProductoID uint    `json:"producto_id"`
	Cantidad   int     `json:"cantidad"`
	Subtotal   float64 `json:"subtotal"`
}

func (PedidosItems) TableName() string {
	return "pedidos_items"
}

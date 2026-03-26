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

	Sesion  *Sesiones      `json:"sesion,omitempty" gorm:"ForeignKey:sesion_id;AssociationForeignKey:id"`
	Cliente *Clientes      `json:"cliente,omitempty" gorm:"ForeignKey:cliente_id;AssociationForeignKey:id"`
	Estado  *Estados       `json:"estado,omitempty" gorm:"ForeignKey:estado_id;AssociationForeignKey:id"`
	Items   []PedidosItems `json:"items,omitempty" gorm:"ForeignKey:pedido_id;AssociationForeignKey:id"`
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

	Pedido   *Pedidos   `json:"pedido,omitempty" gorm:"ForeignKey:pedido_id;AssociationForeignKey:id"`
	Producto *Productos `json:"producto,omitempty" gorm:"ForeignKey:producto_id;AssociationForeignKey:id"`
}

func (PedidosItems) TableName() string {
	return "pedidos_items"
}

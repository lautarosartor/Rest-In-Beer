package models

type Estados struct {
	ID          uint    `json:"id" gorm:"primary_key"`
	Descripcion string  `json:"descripcion"`
	Color       *string `json:"color"`
}

func (Estados) TableName() string {
	return "estados"
}

type CheckoutEstados struct {
	ID          uint    `json:"id" gorm:"primary_key"`
	Estado      string  `json:"estado"`
	Descripcion *string `json:"descripcion"`
}

func (CheckoutEstados) TableName() string {
	return "checkout_estados"
}

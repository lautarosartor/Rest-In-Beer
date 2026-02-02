package models

import "time"

type Sesiones struct {
	ID         uint       `json:"id" gorm:"primary_key"`
	MesaID     uint       `json:"mesa_id"`
	OwnerID    uint       `json:"owner_id"`
	Activo     bool       `json:"activo" gorm:"default:true"`
	CreatedAt  time.Time  `json:"created_at"`
	FinishedAt *time.Time `json:"finished_at"`
}

func (Sesiones) TableName() string {
	return "sesiones"
}

type SesionesClientes struct {
	ID        uint `json:"id" gorm:"primary_key"`
	SesionID  uint `json:"sesion_id"`
	ClienteID uint `json:"cliente_id"`
}

func (SesionesClientes) TableName() string {
	return "sesiones_clientes"
}

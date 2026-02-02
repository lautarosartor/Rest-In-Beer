package models

import "time"

type Usuarios struct {
	ID        uint       `json:"id" gorm:"primary_key"`
	RolID     uint       `json:"rol_id"`
	Nombre    string     `json:"nombre"`
	Apellido  string     `json:"apellido"`
	Email     string     `json:"email"`
	Password  string     `json:"password"`
	Telefono  *string    `json:"telefono"`
	Activo    bool       `json:"activo" gorm:"default:true"`
	CreatedAt time.Time  `json:"created_at"`
	DeletedAt *time.Time `json:"deleted_at"`
}

func (Usuarios) TableName() string {
	return "usuarios"
}

type Roles struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	Nombre string `json:"nombre"`
}

func (Roles) TableName() string {
	return "roles"
}

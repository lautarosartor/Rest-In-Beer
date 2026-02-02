package models

type Estados struct {
	ID          uint   `json:"id" gorm:"primary_key"`
	Descripcion string `json:"descripcion"`
}

func (Estados) TableName() string {
	return "estados"
}

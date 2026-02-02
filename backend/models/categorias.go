package models

type Categorias struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	Nombre string `json:"nombre"`
}

func (Categorias) TableName() string {
	return "categorias"
}

type Subcategorias struct {
	ID          uint   `json:"id" gorm:"primary_key"`
	CategoriaID uint   `json:"categoria_id"`
	Nombre      string `json:"nombre"`
}

func (Subcategorias) TableName() string {
	return "subcategorias"
}

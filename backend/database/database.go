package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

var db *gorm.DB

func InitDb(SqlString string) {
	fmt.Println(SqlString)
	//conn, err := gorm.Open(mysql.Open(SqlString), &gorm.Config{})

	conn, err := gorm.Open(mysql.Open(SqlString), &gorm.Config{
		SkipDefaultTransaction: false,
		PrepareStmt:            true, // se recomienda usar sentencias preparadas
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true, // usar nombres de tabla singular
		},
	})

	if err != nil {
		fmt.Println(err.Error())
		panic("Failed to connect to database")
	}

	db = conn
	// El logger se utiliza para ver las consultas en la consola
	db.Logger = db.Logger.LogMode(logger.Info)

	fmt.Println("Database connected!")
}

func GetDb() *gorm.DB {
	return db
}

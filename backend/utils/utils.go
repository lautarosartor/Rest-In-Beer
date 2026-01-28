package utils

import (
	"bar/database"
	"bar/models"
	"crypto/rand"
	"errors"
	"fmt"
	"log"
	"math/big"
	"strings"

	extract "github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

// Obtener el ID del usuario activo
func GetUserId(c echo.Context) uint {
	var userID string // Variable para almacenar el ID del usuario

	// Obtener el token de autorización del encabezado de la solicitud
	reqToken := c.Request().Header.Get("Authorization")

	// Dividir el token para obtener solo el token Bearer
	splitToken := strings.Split(reqToken, "Bearer ")

	// Asignar el token a la variable reqToken
	reqToken = splitToken[1]

	// Parsear el token sin verificarlo para obtener los claims
	token, _, err := new(extract.Parser).ParseUnverified(reqToken, extract.MapClaims{})
	if err != nil {
		log.Printf("Error %s", err)
	}

	// Comprobar si se pueden obtener los claims del token
	if claims, ok := token.Claims.(extract.MapClaims); ok {
		// Obtener el ID del usuario desde los claims
		subId := fmt.Sprint(claims["id"]) // Convertir el ID a string
		userID = subId                    // Asignar el ID a la variable userID
	}

	// Obtener la conexión a la base de datos
	db := database.GetDb()
	usuario := new(models.Usuarios) // Crear una nueva instancia de Usuario

	// Buscar al usuario en la base de datos por ID
	db.Where("id = ?", userID).First(&usuario)

	return usuario.ID // Retornar el ID del usuario encontrado
}

// Si el bool es true retornara el ID del rol, de lo contrario retorna el nombre del rol
func GetUserRole(c echo.Context, id bool) interface{} {
	var userRole string

	reqToken := c.Request().Header.Get("Authorization")

	splitToken := strings.Split(reqToken, "Bearer ")

	reqToken = splitToken[1]

	token, _, err := new(extract.Parser).ParseUnverified(reqToken, extract.MapClaims{})
	if err != nil {
		log.Printf("Error %s", err)
	}

	if claims, ok := token.Claims.(extract.MapClaims); ok {
		subRole := fmt.Sprint(claims["role"])
		userRole = subRole
	}

	db := database.GetDb()
	rol := new(models.Roles)

	db.Where("nombre = ?", userRole).First(&rol)

	if id {
		return rol.ID
	}

	return rol.Nombre
}

func GenerateRandomCode(length int) string {
	// Definir el conjunto de caracteres permitidos (letras y números)
	var allowedRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	allowedRunesLen := big.NewInt(int64(len(allowedRunes)))

	// Crear un slice para almacenar el resultado
	b := make([]rune, length)

	// Generar un código aleatorio de longitud n
	for i := range b {
		randomIndex, err := rand.Int(rand.Reader, allowedRunesLen)
		if err != nil {
			panic(err)
		}
		b[i] = allowedRunes[randomIndex.Int64()]
	}
	return string(b)
}

func CleanSQLError(msg string) error {
	msg = strings.TrimPrefix(msg, "mssql: ")
	msg = strings.TrimPrefix(msg, "sql: ")

	return errors.New(strings.TrimSpace(msg))
}

func RespondWithError(c echo.Context, statusCode int, message string) error {
	return c.JSON(statusCode, models.ResponseMessage{
		Status:  "error",
		Message: CleanSQLError(message).Error(),
	})
}

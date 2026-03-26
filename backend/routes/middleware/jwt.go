package middleware

import (
	"bar/config"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JwtCustomClaims define los claims personalizados que usaremos en los tokens JWT.
type JwtCustomClaims struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Role string `json:"role"`
	jwt.RegisteredClaims
}

type ClientClaims struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Dni   string `json:"dni"`
	Color string `json:"color"`
	jwt.RegisteredClaims
}

func initEnv() {
	config.LoadEnvProps(".env")
}

// GenerarToken crea un nuevo token JWT
func GenerarToken(id uint, name, role string) (string, error) {
	claims := &JwtCustomClaims{
		ID:   id,
		Name: name,
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.GetString("JWT_KEY")))
}

// ValidarToken valida un token JWT y retorna las afirmaciones
func ValidarToken(tokenString string) (*JwtCustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &JwtCustomClaims{}, func(token *jwt.Token) (any, error) {
		return []byte(config.GetString("JWT_KEY")), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*JwtCustomClaims)
	if !ok || !token.Valid {
		return nil, errors.New("token inválido")
	}

	return claims, nil
}

// GenerarClientToken crea un nuevo token JWT para el cliente
func GenerarClientToken(id uint, name, dni, color string) (string, error) {
	claims := &ClientClaims{
		ID:               id,
		Name:             name,
		Dni:              dni,
		Color:            color,
		RegisteredClaims: jwt.RegisteredClaims{},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.GetString("JWT_CLIENT_KEY")))
}

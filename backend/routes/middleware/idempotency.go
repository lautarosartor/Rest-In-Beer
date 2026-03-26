package middleware

import (
	"bar/models"
	"bar/redis"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type CachedResponse struct {
	Status int
	Body   string
}

type responseRecorder struct {
	http.ResponseWriter
	body *bytes.Buffer
}

func (r *responseRecorder) Write(b []byte) (int, error) {
	r.body.Write(b)
	return r.ResponseWriter.Write(b)
}

func Idempotency() echo.MiddlewareFunc {
	rdb := redis.GetRedis()
	ctx := redis.GetContext()

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {

			method := c.Request().Method

			// solo POST/PUT
			if method != "POST" && method != "PUT" {
				return next(c)
			}

			key := c.Request().Header.Get("Idempotency-Key")
			if key == "" {
				return next(c)
			}

			// obtener user o client ID desde JWT
			var userID interface{} = "none"
			var userType string = "none"

			if userToken := c.Get("user"); userToken != nil {
				token := userToken.(*jwt.Token)

				switch claims := token.Claims.(type) {
				case *JwtCustomClaims:
					userID = claims.ID
					userType = "admin"
				case *ClientClaims:
					userID = claims.ID
					userType = "client"
				}
			}

			redisKey := fmt.Sprintf("idemp:%s:%s:%v:%s", method, userType, userID, key)

			// 1. verificar si ya existe respuesta
			val, err := rdb.Get(ctx, redisKey).Result()
			if err == nil {
				var cached CachedResponse
				json.Unmarshal([]byte(val), &cached)

				return c.String(cached.Status, cached.Body)
			}

			// 2. evitar doble ejecución concurrente
			lockKey := redisKey + ":lock"

			res, err := rdb.Set(ctx, lockKey, "1", time.Minute*5).Result()
			if err != nil {
				return c.JSON(http.StatusInternalServerError, models.ResponseMessage{
					Status:  "error",
					Message: "Error inesperado",
					Ok:      false,
				})
			}

			// si NO devuelve "OK" → ya existe el lock
			if res != "OK" {
				return c.JSON(http.StatusConflict, models.ResponseMessage{
					Status:  "error",
					Message: "Solicitud ya en proceso",
					Code:    "IDEMPOTENCY_DETECTED",
					Ok:      false,
				})
			} else {
				defer rdb.Del(ctx, lockKey)
			}

			// 3. capturar respuesta
			rec := &responseRecorder{
				ResponseWriter: c.Response().Writer,
				body:           new(bytes.Buffer),
			}
			c.Response().Writer = rec

			err = next(c)

			// 4. guardar respuesta en redis
			cached := CachedResponse{
				Status: c.Response().Status,
				Body:   rec.body.String(),
			}

			jsonData, _ := json.Marshal(cached)

			rdb.Set(ctx, redisKey, jsonData, time.Minute*10) // TTL

			return err
		}
	}
}

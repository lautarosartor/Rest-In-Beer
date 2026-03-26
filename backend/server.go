package main

import (
	"bar/config"
	"bar/database"
	"bar/redis"
	routes "bar/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	config.LoadEnvProps(".env")
	database.InitDb(config.GetString("DB_STR"))
	redis.InitRedis("localhost:6379")

	// API routes
	routes.InitRoutes(e)

	// Start server
	e.Logger.Fatal(e.Start(config.GetString("HTTP_PORT")))
}

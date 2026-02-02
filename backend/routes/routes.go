package routes

import (
	"bar/config"
	authController "bar/controllers/auth"
	categoriasController "bar/controllers/categorias"
	clientesController "bar/controllers/clientes"
	estadosController "bar/controllers/estados"
	mesasController "bar/controllers/mesas"
	pedidosController "bar/controllers/pedidos"
	productosController "bar/controllers/productos"
	promocionesController "bar/controllers/promociones"
	sesionesController "bar/controllers/sesiones"
	subcategoriasController "bar/controllers/subcategorias"
	usuariosController "bar/controllers/usuarios"
	"bar/routes/middleware"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo) {
	a := e.Group("/api")    // privado con JWT
	b := e.Group("/public") // publico

	// Configurar el middleware de JWT
	config.LoadEnvProps(".env")
	cfg := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(middleware.JwtCustomClaims) // claims personalizados
		},
		SigningKey: []byte(config.GetString("JWT_KEY")), // clave secreta para firmar y validar los token JWT
	}

	// Aplicamos el middleware a las rutas privadas
	a.Use(echojwt.WithConfig(cfg))

	//======================================================================================================

	// endpoint de bienvenida
	a.GET("", authController.Restricted)

	// auth
	b.POST("/login", authController.Login)
	b.POST("/register", authController.Register)

	// users
	a.GET("/usuarios", usuariosController.GetAll)
	a.GET("/usuario/:id", usuariosController.Get)
	a.PUT("/usuario/:id", usuariosController.Update)

	// sesions
	a.GET("/sesiones", sesionesController.GetAll)
	b.GET("/sesion", sesionesController.Get)
	b.POST("/sesion", sesionesController.Create)
	b.DELETE("/sesion/:id", sesionesController.Delete)

	// states
	a.GET("/estados", estadosController.GetAll)

	// categories
	a.GET("/categorias", categoriasController.GetAll)

	// subcategories
	a.GET("/subcategorias-all", subcategoriasController.GetAll)
	a.GET("/subcategoria/:id", subcategoriasController.Get)

	// tables
	a.GET("/mesas", mesasController.GetAll)
	a.GET("/mesa/:id", mesasController.Get)
	a.POST("/mesa", mesasController.Create)
	a.PUT("/mesa/:id", mesasController.Update)

	// promotions
	a.GET("/promociones", promocionesController.GetAll)
	a.GET("/promocion/:id", promocionesController.Get)
	a.POST("/promocion", promocionesController.Create)
	a.PUT("/promocion/:id", promocionesController.Update)

	// customers
	a.GET("/clientes", clientesController.GetAll)
	a.GET("/cliente/:id", clientesController.Get)
	b.POST("/cliente", clientesController.Create)

	// products
	b.GET("/productos", productosController.GetPaginated)
	b.GET("/producto/:id", productosController.Get)
	a.POST("/producto", productosController.Create)
	a.PUT("/producto/:id", productosController.Update)

	// orders
	a.GET("/pedidos", pedidosController.GetAllPaginated)
	b.GET("/pedidos/:id", pedidosController.GetAllPublic)
	a.GET("/pedido/:id", pedidosController.Get)
	b.POST("/pedido", pedidosController.Create)
}

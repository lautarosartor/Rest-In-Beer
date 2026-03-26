package redis

import (
	"context"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var client *redis.Client

func InitRedis(addr string) {
	client = redis.NewClient(&redis.Options{
		Addr: addr, // "localhost:6379"
	})

	// ping para validar conexión
	_, err := client.Ping(ctx).Result()
	if err != nil {
		panic("Redis connection failed: " + err.Error())
	}
}

func GetRedis() *redis.Client {
	return client
}

func GetContext() context.Context {
	return ctx
}

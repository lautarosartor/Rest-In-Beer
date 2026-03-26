package models

import "time"

type IdempotencyKeys struct {
	ID         uint      `json:"id" gorm:"primary_key"`
	Key        string    `json:"key" gorm:"uniqueIndex"`
	Response   string    `json:"response"`
	StatusCode int       `json:"status_code"`
	CreatedAt  time.Time `json:"created_at"`
}

func (IdempotencyKeys) TableName() string {
	return "idempotency_keys"
}

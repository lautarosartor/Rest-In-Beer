package models

type ResponseMessage struct {
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
}

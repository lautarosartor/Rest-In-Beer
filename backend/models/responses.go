package models

type ResponseMessage struct {
	Ok      bool   `json:"ok,omitempty"`
	Status  string `json:"status,omitempty"`
	Code    string `json:"code,omitempty"`
	Message string `json:"message,omitempty"`
}

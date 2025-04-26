package consts

import "time"

const (
	CodeUrl          = "http://192.168.123.120:8000/code" // адрес канального уровня
	KafkaAddr        = "localhost:29092"
	KafkaTopic       = "segments"
	SegmentSize      = 100
	SegmentLostError = "lost"
	KafkaReadPeriod  = 2 * time.Second
	ReceiveUrl = "http://192.168.123.140:3000/receive" // адрес websocket-сервера прикладного уровня

)

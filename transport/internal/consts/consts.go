package consts

import "time"

const (
	CodeUrl          = "http://10.242.229.162:8030/code" // адрес канального уровня
	KafkaAddr        = "localhost:29092"
	KafkaTopic       = "segments"
	SegmentSize      = 100
	SegmentLostError = "lost"
	KafkaReadPeriod  = 2 * time.Second
	ReceiveUrl = "http://10.242.97.6:8010/receive" // адрес websocket-сервера прикладного уровня

)

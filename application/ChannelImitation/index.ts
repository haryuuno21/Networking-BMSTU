import express from "express";
import http from "http";
import axios from "axios";

export interface Message {
  id?: number;
  username: string;
  payload?: string;
  send_time?: string;
  has_error?: boolean;
  self?: boolean;
}

const PORT = 8030;
const HOST = "127.0.0.1";
const TRANSPORT_PORT = 8020;
const app = express(); // создание экземпляра приложения express
const server = http.createServer(app); // создание HTTP-сервера

// Используйте express.json() для парсинга JSON тела запроса
app.use(express.json());

app.post(
  "/code",
  (req: { body: Message }, res: { sendStatus: (arg0: number) => void }) => {
    const message: Message = req.body;
    sendBack(message).catch(() => {});
    res.sendStatus(200);
  },
);

// запуск сервера приложения
server.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`);
});

const sendBack = (message: Message): Promise<void> => {
  return axios.post(`http://${HOST}:${TRANSPORT_PORT}/transfer/`, message);
};

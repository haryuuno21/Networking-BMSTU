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

const PORT = 8020;
const HOST = "localhost"
const app = express(); // создание экземпляра приложения express
const server = http.createServer(app); // создание HTTP-сервера

// Используйте express.json() для парсинга JSON тела запроса
app.use(express.json());

app.post(
  "/send",
  (req: { body: Message }, res: { sendStatus: (arg0: number) => void }) => {
    const message: Message = req.body;
    sendMessageToMars(message);
    res.sendStatus(200);
  }
);

// запуск сервера приложения
server.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`);
});

const sendMessageToMars = (message: Message): Promise<void> => {
    return axios.post(
      `http://${HOST}:8010/receive`,
      message
    );
  };
  
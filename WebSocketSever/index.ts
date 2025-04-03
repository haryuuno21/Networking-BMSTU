import express from "express";
import axios from "axios";
import http from "http";
import * as ws from "ws";
import { HOST_NAME, PORT } from "../index.constants";
import { Message, Users } from "./index.types";

const app = express(); // создание экземпляра приложения express
const server = http.createServer(app); // создание HTTP-сервера

// Используйте express.json() для парсинга JSON тела запроса
app.use(express.json());

// запуск сервера приложения
server.listen(PORT, HOST_NAME, () => {
  console.log(`Server started at http://${HOST_NAME}:${PORT}`);
});

const wss = new ws.WebSocketServer({ server });
const users: Users = {};

// обрабочик на коннект для вебсокета
wss.on("connection", (websocketConnection: ws.WebSocket, req: Request) => {
  if (req.url.length === 0) {
    console.log(`Error: req.url = ${req.url}`);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const url = new URL(req?.url, `http://${req.headers.host}`);
  const username = url.searchParams.get("username"); // берем имя юзера из параметра

  if (username !== null) {
    console.log(`[open] Connected, username: ${username}`);

    if (username in users) {
      users[username] = [
        ...users[username],
        { id: users[username].length + 1, ws: websocketConnection },
      ];
    } else {
      users[username] = [{ id: 1, ws: websocketConnection }];
    }
  } else {
    console.log("[open] Connected");
  }

  // обработчик на получение сообщения
  websocketConnection.on("message", (messageString: string) => {
    console.log("[message] Received from " + username + ": " + messageString);

    const message: Message = JSON.parse(messageString);
    message.self = false;
    message.username = message.username ?? username;
    sendMessageToOtherUsers(message.username, message);
  });

  // обработчик на закрытие
  websocketConnection.on("close", (event: any) => {
    console.log(username, "[close] Соединение прервано", event);

    delete users.username;
  });
});

function sendMessageToOtherUsers(username: string, message: Message): void {
  const msgString = JSON.stringify(message); // сериализуем сообщение
  for (const key in users) {
    if (key !== username) {
      // кроме нашего юзера
      users[key].forEach((element) => {
        element.ws.send(msgString);
      });
    }
  }
}

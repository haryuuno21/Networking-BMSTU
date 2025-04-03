import { FC, FormEvent, useState } from "react";
import "./mainPage.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import {
  setLoginAction,
  setWSAction,
} from "../../store/slices/userSlice/userSlice";
import { useAppDispatch } from "../../store";
import { EARTH_PORT, HOST_NAME, MARS_PORT } from "../../../../index.constants";
import { addMessageAciton } from "../../store/slices/messagesSlice/messagesSlice";
import { AppDispatch } from "../../store/index.types";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const dispatch = useAppDispatch();
  const port = import.meta.env.VITE_IS_MARS ? MARS_PORT : EARTH_PORT;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!login || login === "") return;

    dispatch(setLoginAction(login));
    dispatch(
      setWSAction(
        createWebSocket(
          `ws://${HOST_NAME}:${port}/?username=${encodeURIComponent(login)}`,
          dispatch
        )
      )
    );
    navigate(ROUTES.CHAT);
  }

  return (
    <div className="page-container">
      <form onSubmit={onSubmit} className="login-form">
        <TextField
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          variant="outlined"
          size="medium"
          label="Логин"
        ></TextField>
        <Button type="submit" size="large" color="primary" variant="contained">
          Войти
        </Button>
      </form>
    </div>
  );
};

const createWebSocket = (url: string, dispatch: AppDispatch) => {
  const ws = new WebSocket(url); // создаем новый инстанс

  // обработчик на открытие соединения
  ws.onopen = function () {
    console.log("WebSocket connection opened");
  };

  // обработчик на получение сообщения
  ws.onmessage = function (event) {
    const msgString = event.data;
    const message = JSON.parse(msgString); // парсим

    console.log("Message from server:", message);

    // сеттим сообщение в массив
    dispatch(addMessageAciton(message));
  };
  // обработчик на закрытие
  ws.onclose = function () {
    console.log("WebSocket connection closed");
  };

  // обработчик на ошибку
  ws.onerror = function (event) {
    console.error("WebSocket error:", event);
  };

  return ws;
};

import { FC, FormEvent, useEffect, useState } from "react";
import "./chatPage.css";
import { Button, TextField } from "@mui/material";
import { useLogin, useWS } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import { useAppDispatch } from "../../store";
import { Message } from "../../store/slices/messagesSlice/index.types";
import {
  addMessageAciton,
  useMessages,
} from "../../store/slices/messagesSlice/messagesSlice";
import { MessageCard } from "../../components/messageCard/messageCard";

export const ChatPage: FC = () => {
  const [messageData, setMessageData] = useState("");
  const login = useLogin();
  const ws = useWS();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const messages = useMessages();

  useEffect(() => {
    if (!login) navigate(ROUTES.HOME);
  }, [login]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!messageData || messageData === "") return;
    setMessageData("");
    if (login && ws) {
      let message: Message = {
        username: login,
        send_time: new Date().toISOString(),
        self: true,
        payload: messageData,
      };
      const msgJSON = JSON.stringify(message);
      ws.send(msgJSON);
      dispatch(addMessageAciton(message));
    }
  }

  return (
    <div className="page-container">
      <div className="chat-container">
        {messages.map((message, index) => (
          <MessageCard key={index} message={message} />
        ))}
      </div>
      {import.meta.env.VITE_IS_MARS ? (
        <></>
      ) : (
        <form onSubmit={onSubmit} className="message-form">
          <TextField
            value={messageData}
            onChange={(e) => setMessageData(e.target.value)}
            variant="outlined"
            size="medium"
            label="Сообщение"
          ></TextField>

          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
          >
            Отправить
          </Button>
        </form>
      )}
    </div>
  );
};

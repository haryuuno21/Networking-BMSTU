import { FC, FormEvent, useState } from "react";
import "./chatPage.css";
import { Button, TextField } from "@mui/material";

export const ChatPage: FC = () => {
  const [message, setMessage] = useState("");

  function onSubmit(e:FormEvent){
    e.preventDefault();
    if(!message || message === "") return;
    console.log("login", " отправил:", message);
  }

  return (
    <div className="page-container">
      <div className="chat-container">

      </div>
      <form onSubmit={onSubmit} className="login-form">
        <TextField value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" size="medium" label="Сообщение"></TextField>
        <Button type='submit' size="large" color="primary" variant="contained">
          Отправить
        </Button>
      </form>
    </div>
  );
};

import { FC, FormEvent, useState } from "react";
import "./mainPage.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");

  function onSubmit(e:FormEvent){
    e.preventDefault();
    if(!login || login === "") return;
    console.log(login);
    navigate(ROUTES.CHAT);
  }

  return (
    <div className="page-container">
      <form onSubmit={onSubmit} className="login-form">
        <TextField value={login} onChange={(e) => setLogin(e.target.value)} variant="outlined" size="medium" label="Логин"></TextField>
        <Button type='submit' size="large" color="primary" variant="contained">
          Войти
        </Button>
      </form>
    </div>
  );
};

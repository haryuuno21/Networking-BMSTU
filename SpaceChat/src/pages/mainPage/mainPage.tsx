import { FC } from "react";
import "./mainPage.css";
import { Button, TextField } from "@mui/material";

export const HomePage: FC = () => {
  return (
    <div className="page-container">
      <div>
        <TextField variant="outlined" size="medium" label="Логин"></TextField>
        <Button size="large" color="primary" variant="contained">Войти</Button>
      </div>
    </div>
  );
};

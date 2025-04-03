import { FC } from "react";
import "./navBar.css";
import {
  ClearUserAction,
  useLogin,
  useWS,
} from "../../store/slices/userSlice/userSlice";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../store";
import { clearMessagesAction } from "../../store/slices/messagesSlice/messagesSlice";

export const NavBar: FC = () => {
  const login = useLogin();
  const ws = useWS();
  const dispatch = useAppDispatch();

  function onClick() {
    if (ws) {
      ws.close(4000, login);
    } else {
      console.log("no ws connection");
    }
    dispatch(ClearUserAction());
    dispatch(clearMessagesAction());
  }

  return (
    <nav className="nav-bar">
      <h2 id="title">Space Chat</h2>
      {login !== "" && (
        <div className="user-exit-wrap">
          <h3>{login}</h3>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={onClick}
          >
            Выйти
          </Button>
        </div>
      )}
    </nav>
  );
};

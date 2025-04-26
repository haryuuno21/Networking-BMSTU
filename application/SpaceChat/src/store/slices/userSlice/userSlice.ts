import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface State {
  login: string;
  ws?: WebSocket;
}

const userSlice = createSlice({
  name: "user",
  initialState:  {
    login: "",
    ws: undefined,
  } as State,
  reducers: {
    setLogin(state, { payload }) {
      state.login = payload;
    },

    setWS(state, { payload }) {
      state.ws = payload;
    },

    clearUser(state) {
      state.login = "";
      state.ws = undefined;
    },
  },
});

export const useLogin = () =>
  useSelector((state: RootState) => state.user.login);

export const useWS = () => 
  useSelector((state: RootState) => state.user.ws);

export const {
  setWS: setWSAction,
  setLogin: setLoginAction,
  clearUser: ClearUserAction,
} = userSlice.actions;

export default userSlice.reducer;

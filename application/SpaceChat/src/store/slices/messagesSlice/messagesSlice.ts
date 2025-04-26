import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Message } from "./index.types";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [] as Message[],
  },
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },

    addMessage(state, { payload }) {
      state.messages = [...state.messages, payload];
    },

    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const useMessages = () =>
  useSelector((state: RootState) => state.messages.messages);

export const {
  setMessages: setMessagesAciton,
  addMessage: addMessageAciton,
  clearMessages: clearMessagesAction,
} = messagesSlice.actions;

export default messagesSlice.reducer;

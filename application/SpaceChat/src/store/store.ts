import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import messagesReducer from "./slices/messagesSlice/messagesSlice";

const rootReducer = combineReducers({
  messages: messagesReducer,
  user: userReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

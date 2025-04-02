import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"

const rootReducer = combineReducers({user: userReducer})
export default configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>
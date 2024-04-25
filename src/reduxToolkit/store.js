import { configureStore } from "@reduxjs/toolkit";
import AddUserReducer from "./slice/userSlice";
export const store = configureStore({
  reducer: {
    addUserReducer:AddUserReducer
  },
});

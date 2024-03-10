import { configureStore } from "@reduxjs/toolkit";
import { AppReducer } from "./appSlice";

export default configureStore({
  reducer: {
    AppData: AppReducer,
  },
});

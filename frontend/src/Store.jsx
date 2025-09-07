import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/SliceAuth";
import taskReducer from "./Slices/SliceTask";   // 👈 default import (no {})

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

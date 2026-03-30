import { configureStore } from "@reduxjs/toolkit";
import reportsReducer from "./slices/reportsSlice";
import helpReducer from "./slices/helpSlice";
import chatReducer from "./slices/chatSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    reports: reportsReducer,
    help: helpReducer,
    chat: chatReducer,
    auth: authReducer,
  },
});

export default store;
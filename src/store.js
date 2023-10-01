import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducer/postReducer";
import authReducer  from "./reducer/authSlice";

const store = configureStore({
  reducer:{
    posts:postReducer,
    auth:authReducer
  }
})

export default store
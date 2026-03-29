import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Feature/Theme/themeSlice"
import authReducer from"./authSlice"

 export const Store =  configureStore({
    reducer:{
        auth: authReducer,
        theme:themeReducer
    },
});
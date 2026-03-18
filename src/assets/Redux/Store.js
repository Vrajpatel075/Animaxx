import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Feature/Theme/themeSlice"

 export const Store =  configureStore({
    reducer:{
        theme:themeReducer,
    },
});
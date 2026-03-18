import { createSlice } from "@reduxjs/toolkit";

const initialMode = localStorage.getItem("mode") 
const ThemeSlicer = createSlice({
    name:"theme",
    initialState : {mode:initialMode},
    
    reducers:{
        toggleMode:(state)=>{
            state.mode  = state.mode === "light" ? "dark" : "light" ;
            localStorage.setItem("mode" , state.mode);
        },
        setMode:(state ,action)=>{
            state.mode = action.payload;
            localStorage.setItem("mode" , state.mode);
        }
    }
})

export const {toggleMode , setMode} = ThemeSlicer.actions;
export default ThemeSlicer.reducer;
// import { createContext, useContext, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({children})=>{
//     const [currMode, setCurrMode] = useState(
//         localStorage.getItem("mode") || "light"
//     )


// const toggleMode = () =>{
//     const newMode = currMode === "light" ? "dark" : "light"; 
//     setCurrMode(newMode);
//     localStorage.setItem("mode", newMode);
//     document.body.classList.remove(currMode);
//     document.body.classList.add(newMode);
// }

// return ( 
// <ThemeContext.Provider value={{ currMode, toggleMode }}> 
//     {children} 
// </ThemeContext.Provider> 
// );
// };

// export const useTheme = () => useContext(ThemeContext);
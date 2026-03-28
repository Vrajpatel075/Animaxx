import React from 'react'
import "../ModelCss/SignInCheak.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function SignInCheak({onClose}) {
    const navigate= useNavigate();
    const currMode = useSelector((state)=>state.theme.mode);
  return (
    <div className='ModelContainer' onClick={onClose}>
        <div className={`SignInBox ${currMode === "light" ? "light" : "dark"}`} onClick={(e) => e.stopPropagation()}>
            <div className="titleModel">
            <h1>Welcome to Animaxx</h1>
            <p>Get started—step into the world of anime art.</p>
            </div>
            <div className='SignInCheakBtn'>
                <button onClick={()=>navigate("/SignIn")}>Sign-In</button>
            </div>
        <div class="separator">
            <span>OR</span>
        </div>
        
        </div>
    </div>
  )
}

export default SignInCheak
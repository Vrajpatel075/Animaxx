import React from 'react'
import "./SignInCheak.css"
import { useSelector } from 'react-redux'
import { useSafeNavigate } from '../../OfflineBackup/useSafeNavigate';
function SignInCheak({onClose}) {
    const safeNavigate= useSafeNavigate();
    const currMode = useSelector((state)=>state.theme.mode);
  return (
    <div className='ModelContainer' onClick={onClose}>
        <div className={`SignInBox ${currMode === "light" ? "light" : "dark"}`} onClick={(e) => e.stopPropagation()}>
            <div className="titleModel">
            <h1>Welcome to Animaxx</h1>
            <p>Get started—step into the world of anime art.</p>
            </div>
            <div className='SignInCheakBtn'>
                <button onClick={()=>safeNavigate("/SignIn")}>Sign-In</button>
            </div>
        <div className="separator">
            <span>OR</span>
        </div>
        
        </div>
    </div>
  )
}

export default SignInCheak
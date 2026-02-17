import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'; 
import '../WebPagesCss/SignIn.css'
import UserService from '../../Service/UserService';
function SignIn({setIsLoggedIn}) {

    const  [email , setEmail]=useState("");
    const  [password , setPassword]=useState("");
    const [errors , setErrors] =  useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();

      let newError = {};
        if(!email.trim()) newError.email = "Enter Email";
        if(!password.trim()) newError.password ="Enter Password";
        setErrors(newError);

      try{
        if(Object.keys(newError).length === 0){
        const responce = await UserService.login({email , password})
        const loggedInUser = responce.data;
        
        localStorage.setItem("userId", loggedInUser.userId); 
        setIsLoggedIn(true);
        localStorage.setItem("userEmail", loggedInUser.email);
        
        alert("Login successful for user: " + loggedInUser.username);
        navigate("/ProfilePg");}
      }catch (error){
        alert("login failed" + error);
      }
    }
  return (


    <>
       <div className="Sign-in-up-page">
        <div className="container">
            <div className="info_container">    
                <div className="form_logo"><img src="/animax img source/ANIMAX_LOGO.png" alt=""/></div>
                <div className="info_title">CREATE AN FREE ACCOUNT & BUILD YOUR OWN ANIME COMMUNITY </div>
                        <div className="disc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
                        </div>
            </div>
            <div className="form_container">
            <div className="title">LOGIN</div>
                <form action="" onSubmit={handleSubmit}>
                <div className="form">

                <input className="effect-1" 
                type="email" 
                name="email"  
                placeholder="Enter email" 
                onChange={(e)=> setEmail(e.target.value)}/>
                {errors.email && <span className='error'>{errors.email}</span>}

                <input 
                type="password" 
                name="Password" 
                placeholder="Enter Password"
                onChange={(e)=> setPassword(e.target.value)}/>
                {errors.password && <span className='error'>{errors.password}</span>}

                </div>
                <div className="terms">
                <label>
                  <input type="checkbox" style={{marginRight: "5px"}} required/>
                  I Agree To The <Link to="/">terms & conditions</Link>
                </label>
              </div>

                <div className="button-container">
                <button>Submit</button>
                </div>
                 <div className="login-opt">
                <p>Don't have an account? <Link to="/SignUpUserinfo">SIGN UP</Link></p>
                <p>Forgot password? <Link to="/ChangePassword">Change Password</Link></p>
              </div>
            </form>
            </div>
    
        </div>
    </div>
    </>
  )
}

export default SignIn
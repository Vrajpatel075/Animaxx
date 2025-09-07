import React from 'react'
import { Link } from 'react-router-dom'; 
import '../WebPagesCss/SignIn.css'
function SignIn() {
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
                <form action="">
                <div className="form">
                <input className="effect-1" type="text" name="Username" placeholder="Enter Username"/>
                <input type="password" name="Password" placeholder="Enter Password"/>
                </div>
                <div className="terms">
                <label>
                  <input type="checkbox" style={{marginRight: "5px"}}/>
                  I Agree To The <Link to="/">terms & conditions</Link>
                </label>
              </div>

                <div className="button-container">
                <button>Submit</button>
                </div>
                 <div className="login-opt">
                <p>Don't have an account? <Link to="/SignUp">SIGN UP</Link></p>
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
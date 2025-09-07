import React from 'react'
import { Link } from 'react-router-dom';
import '../WebPagesCss/SignIn.css'

function SignUp() {
  return (
    <>
      <div className="Sign-in-up-page">
        <div className="container">
          <div className="info_container">
            <div className="form_logo">
              <img src="/animax img source/ANIMAX_LOGO.png" alt="Animax Logo" />
            </div>
            <div className="info_title">
              CREATE A FREE ACCOUNT & BUILD YOUR OWN ANIME COMMUNITY
            </div>
            <div className="disc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
            </div>
          </div>

          <div className="form_container">
            <div className="title">SIGN UP</div>
            <form action="">
              <div className="form">
                <input className="effect-1" type="text" name="Username" placeholder="Enter Username" />
                <input type="number" name="Number" placeholder="Enter Number" />
                <input type="password" name="Password" placeholder="Enter Password" />
              </div>

              <div className="terms">
                <label>
                  <input type="checkbox" />
                  I agree to the <Link to="/">terms & conditions</Link>
                </label>
              </div>

              <div className="button-container">
                <button type="submit">Submit</button>
              </div>

              <div className="login-opt">
                <p>
                  Already have an account? <Link to="/SignIn">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
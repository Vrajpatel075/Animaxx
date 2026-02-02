import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../WebPagesCss/SignIn.css';
import AuthService from '../../Service/AuthService';
import UserService from '../../Service/UserService';

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.register({
        username,
        email,
        password
      });
      alert("Registration successful!"+ username + email + password);
      navigate("/SignIn");
    } catch (error) {
      alert("Registration failed!" + error);
    }
  };

  return (
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
          <form onSubmit={handleSubmit}>
            <div className="form">
              <input 
                type="text" 
                placeholder="Enter Username" 
                onChange={(e) => setUsername(e.target.value)} 
              />
              {/* <input 
                type="number" 
                placeholder="Enter Number" 
                onChange={(e) => setNumber(e.target.value)} 
              /> */}
              <input 
                type="email" 
                placeholder="Enter Email" 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Enter Password" 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div className="terms">
              <label>
                <input type="checkbox" required />
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
  );
}

export default SignUp;

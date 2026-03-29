import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../WebPagesCss/SignIn.css';
import UserService from '../../Service/UserService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/authSlice';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};
    if (!email.trim()) newError.email = "Enter Email";
    if (!password.trim()) newError.password = "Enter Password";
    setErrors(newError);

    try {
      if (Object.keys(newError).length === 0) {
        const response = await UserService.login({ email, password });
        const loggedInUser = response.data;

        dispatch(loginSuccess({
          userId: loggedInUser.userId,
          email: loggedInUser.email
        }));

        alert("Login successful for user: " + loggedInUser.username);
        navigate(`/ProfilePg/${loggedInUser.userId}`);
      }
    } catch (error) {
      alert("Login failed: " + error);
    }
  };

  return (
    <div className="Sign-in-up-page">
      <div className="container">
        <div className="info_container">    
          <div className="form_logo">
            <img src="/animax img source/ANIMAX_LOGO.png" alt=""/>
          </div>
          <div className="info_title">
            CREATE A FREE ACCOUNT & BUILD YOUR OWN ANIME COMMUNITY
          </div>
          <div className="disc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </div>
        </div>
        <div className="form_container">
          <div className="titleMessage">
            <h2>Welcome Back!</h2>
            <p>Please Log in to your account.</p>  
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <input 
                className="effect-1" 
                type="email" 
                placeholder="Enter email" 
                onChange={(e)=> setEmail(e.target.value)}
              />
              {errors.email && <span className='error'>{errors.email}</span>}

              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password"
                onChange={(e)=> setPassword(e.target.value)}
              />
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>
            
            <div className="showpassword">
              <label>
                <input 
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span>Show Password</span> 
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
  );
}

export default SignIn;

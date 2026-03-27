import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../WebPagesCss/SignIn.css';
import UserService from '../../Service/UserService';

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors , setErrors] = useState("");
  const navigate = useNavigate();
  const location = useLocation()

  const { firstName, lastName, phone , country } = location.state || {};

  const handleUsernameChange = async (e) => {
  const value = e.target.value;
  setUsername(value);

  if (value.trim()) {
    try {
      const res = await UserService.cheakusername(value);
      if (res.data.exists) {
        setErrors(prev => ({ ...prev, username: "Username already exists." }));
      } else {
        setErrors(prev => ({ ...prev, username: "" }));
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError={};
    if(!username.trim()) newError.username = "Enter User Name";
    if(!email.trim()) newError.email = "Enter Email";
    if(!password.trim())newError.password = "Enter Password";
      
    if (errors.username) {
      newError.username = errors.username;
    }
    setErrors(newError);

    try {
      if(Object.keys(newError).length ===  0){
      const response = await UserService.register({
        firstName,
        lastName,
        phone,
        username,
        email,
        password
      });
      alert("Registration successful!"+ username + " " + email + " " + password + " " + firstName + " " + lastName + " " + phone + " " + country);
      navigate("/SignIn");}
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
                onChange={handleUsernameChange} 
              />
              {errors.username && <span className='error'>{errors.username}</span>}
      
              <input 
                type="email" 
                placeholder="Enter Email" 
                onChange={(e) => setEmail(e.target.value)} 
              />
              {errors.email && <span className='error'>{errors.email}</span>}

              <input 
                type="password" 
                placeholder="Enter Password" 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>

            <div className="terms">
              <label>
                <input type="checkbox" required />
                <span>I agree to the <Link to="/">terms & conditions</Link></span> 
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

import React, { useState } from 'react';
import "./SignIn.css";
import { useLocation } from 'react-router-dom';
import UserService from '../../../Service/UserService';
import { toast } from 'react-hot-toast';

function SignUpUserinfo() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const safeNavigate = safeNavigate();
  const location = useLocation();

  // values passed from SignUp page
  const { username, email, password } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};
    if (!name.trim()) newError.name = "Please enter your name";
    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      try {
        await UserService.register({
          name,
          username,
          email,
          password
        });
        toast.success("Registration successful!");
        safeNavigate("/SignIn");
      } catch (error) {
        console.log(error)
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <div className="Sign-in-up-page">
      <div className="container">
        <div className="info_container">
          <div className="form_logo">
            <img src="/animax-img/ANIMAX_LOGO.png" alt="Animax Logo" />
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
            <h2>Get Started</h2>
            <p>To unlock endless creativity.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form">
              <input 
                type="text" 
                placeholder="Name" 
                maxLength={16}
                onChange={(e) => setName(e.target.value)} 
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="button-container">
              <button className='mouseCursor' type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpUserinfo;

import React, { useState } from 'react'
import { GrFormNextLink } from "react-icons/gr";
import "../WebPagesCss/SignIn.css"
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';

function SignUpUserinfo() {

const [firstName , setFirstName]= useState("");
const [lastName , setLasttName]= useState("");
const [phone , setPhone]= useState("");
const [country , setCountry] = useState("")
const [errors , setErrors] = useState("");
const navigate = useNavigate()


const handleNext = (e) =>{
  e.preventDefault();

  let newError={};
  if(!firstName.trim()) newError.firstName = "Enter First Name";
  if(!lastName.trim()) newError.lastName ="Enter Last Name";
  if(!phone.trim()) newError.phone = "Enter Phone Number";

  setErrors(newError);
  if(Object.keys(newError).length  === 0){
    navigate("/SignUp",{state:{firstName ,lastName , phone , country}})
  }
}


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
          <form onSubmit={handleNext}>
            <div className="form">
              <input 
                type="text" 
                placeholder="First Name" 
                onChange={(e) => setFirstName(e.target.value)} 
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              <input 
                type="text" 
                placeholder="Last Name" 
                onChange={(e) => setLasttName(e.target.value)} 
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
              <PhoneInput
              className="phoneInput"
                placeholder="Enter Phone" 
                country={"in"}
                value={phone}
                onChange={(phone, countryData ) =>{ setPhone(phone); setCountry(countryData?.countryCode)}}
                inputStyle={{width:"100%"}} 
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="button-container">
              <button type="submit">Next</button>
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

export default SignUpUserinfo
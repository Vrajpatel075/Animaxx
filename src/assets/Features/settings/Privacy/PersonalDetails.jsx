import React, { useState } from 'react'
import { useProfileForm } from '../useProfileForm';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaLock, FaLockOpen } from 'react-icons/fa6';
import toast from 'react-hot-toast/headless';

function PersonalDetails({ handleBack }) {
    
    const { editFormData, handleChange, handleSave, profile } = useProfileForm();
    const [isEditable, setIsEditable] = useState(false);
    const currMode = useSelector((state) => state.theme.mode);
    
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");
    
    const handleotp = () =>{
        const newOtp = Math.floor(10000 + Math.random() * 90000).toString();
        setGeneratedOtp(newOtp);
        setIsOtpVerified(false);
        alert(`OTP For Updating password ${newOtp}`)
    }

    const handleVerifyOtp = () =>{
        if(otp  === generatedOtp){
            setIsOtpVerified(true)
            toast.success("OTP verified successfully! You can now change your password.");
        }else{
            toast.error("Invalid OTP. Please try again.");
        }
    }

  return (
                    <div className="setting_header">
                    <div className="userInfoContainer">
                        <div className='BackHeader'>
                            <button 
                            className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                            onClick={handleBack}>
                                    <FaArrowLeft/>
                            </button>
                            <h1>Personal Details</h1>
                        </div>
                        
                        {/* Update Privacy Form */}
                        <div className="Update_Profile">
                                
                                    
                                {/* Edit toggle */}
                                <button onClick={()=>setIsEditable(!isEditable)}>
                                    {isEditable === true ? <FaLockOpen /> : <FaLock />} <span>Edit</span> 
                                </button>
                                    
                                <form onSubmit={handleSave} className={`${currMode ===  "light" ? "light" : "dark"}`}>
                                {/* Email */}
                                    <div>
                                        <label>Email</label>
                                        <input 
                                        type="text"
                                        name="email"
                                        value={editFormData.email || ""}
                                        onChange={handleChange}
                                        disabled={true}
                                        />
                                        <span>Email Cannot be modified</span>
                                    </div>
                                    
                                    {/* Phone Number + DOB */}
                                    <div className="two_inputs">
                                        <div className="inputColums">
                                            <label>Phone Number</label>
                                            <input 
                                               type="text"
                                               name="phoneNumber"
                                               value={editFormData.phoneNumber || ""}
                                               onChange={handleChange}
                                               disabled={!isEditable}
                                               />
                                            </div>
                                        
                                        <div className="inputColums">
                                            <label>Date of Birth</label>
                                            <input 
                                            type="date"
                                            name="dateOfBirth"
                                            value={editFormData.dateOfBirth || ""}
                                            onChange={handleChange}
                                            disabled={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    
                                {/* Password with OTP */}
                                <div className="two_inputs">
                                    <div className="inputColums">
                                        <label>Password</label>
                                        <input 
                                        type="password"
                                        name="password"
                                        value={editFormData.password || ""}
                                        onChange={handleChange}
                                        disabled={!isEditable || !isOtpVerified}
                                        />
                                    </div>

                                    
                                    <div className="inputColums">
                                        <label>Enable Password Change</label>
                                        <input 
                                        type="button"
                                        value="Generate OTP"
                                        onClick={handleotp}
                                        />
                                    </div>
                                </div>
                                
                                {/* OTP Verification */}
                                {generatedOtp && !isOtpVerified && (
                                    <div className="otp_section inputColums">
                                        <label>Enter OTP</label>
                                        <input 
                                        type="text"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <button 
                                        type="button"
                                        className="Verify_otp"
                                        onClick={handleVerifyOtp}
                                        >
                                            Verify OTP
                                        </button>
                                    </div>
                                )}
                                
                                {/* Save Button */}
                                <div className="save_btn">
                                    <button type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
  )
}

export default PersonalDetails
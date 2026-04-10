import React, { useEffect, useState } from 'react'
import UserService from '../../../Service/UserService';
import "./Settings.css"
import { FaArrowLeft, FaEnvelope, FaLock, FaLockOpen, FaMoon, FaPen, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../Redux/themeSlice';
import { fetchuserdata } from '../../Redux/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const [activetab , setActivetab]=useState( window.innerWidth > 650 ? "Account" : null);
    const [isEditable , setIsEditable] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [usernameerror , setUsernameError ] = useState("")
    const [isNavVisible, setIsNavVisible] = useState(true);
    const navigate = useNavigate();


    const dispatch =  useDispatch();
    const currMode = useSelector((state)=> state.theme.mode);
    const {userId , profile} = useSelector((state)=>state.auth);


    const [editFormData , setEditformData] = useState({
        userId:"",
        username:"",
        email:"",
        password:"",
        bio:"",
        firstName:"",
        lastName:"",
        profilePicture:"",
        gender:"",
        dateOfBirth:"",
        phoneNumber:""
    });

    const handleImageUpload = async (e)=>{
        const file = e.target.files[0];
        if(!file) return;

        try{
          const res = await  UserService.uploadProfilePicture(editFormData.userId , file);
          setEditformData(res.data);
          setEditformData(res.data);
          toast.success("Profile picture updated successfully!");
        }catch(error){
            console.log(error);
            toast.error("Failed to upload profile picture: ");
        }

      
    }
    
    useEffect(() => {
        if (userId) {
            dispatch(fetchuserdata(userId));
        }
    }, [userId, dispatch]);
    
    useEffect(() => {
        if (profile) {
            const { createdAt, totalPosts, ...safeData } = profile;
            setEditformData(prev => ({ ...prev, ...safeData }));
        }
    }, [profile]);


    const handleChange = async (e) => {
        const { name, value } = e.target; 
        setEditformData(prev => ({ ...prev, [name]: value })); 
        if(name === "username"){
            try{
                const res = await UserService.cheakusername(value);
                if(res.data.exists){
                    setUsernameError("Username already exists.");
                }else{
                    setUsernameError("");
                }
            }catch(error){
                alert(error)
            }
        }
    };

    const handleSave = async (e)=>{
        e.preventDefault();
        console.log("Payload:", editFormData);
        try{
            const res = await UserService.edit(editFormData.userId , editFormData);
            setEditformData(res.data);
            setIsEditable(false); 
            toast.success("Profile updated successfully!");
        }catch(error){
             console.error(error.response?.data);
            toast.error("Failed to update profile: " + error);
        }
    };

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

    // for small svreens navigation
    const handleTabClick = (tab) => {
        if (window.innerWidth <= 650) {
            setActivetab(tab);
            setIsNavVisible(false);
        } else {
            setActivetab(tab);
            setIsNavVisible(true);
        }
    };
    
    const handleBack = () => {
        setActivetab("Account");
        setIsNavVisible(true);
    };
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 650 && activetab === null) {
                setActivetab("Account"); // default to Account on desktop
            }
            if (window.innerWidth <= 650 && isNavVisible && activetab === "Account") {
                setActivetab(null); // clear default on mobile
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activetab, isNavVisible]);



// change the them / mode from profile
    const changeCurrMode = (mode) =>{
        dispatch(setMode(mode));
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

  return (
    <>
        <div className={`settingContainer ${currMode === 'light' ? 'light' : 'dark'}`}>
            
            {isNavVisible && (
                <div className="Setting_Nav">
                <div className='BackHeader'>
                    <button className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                    onClick={()=>navigate(-1)}>
                        <FaArrowLeft/>
                    </button>
                    <h2>Settings</h2>
                </div>
                <ul className='mouseCursor'>
                    {[
                        {label: "Account", icon: <FaUser/>},
                        {label: "Privacy", icon: <FaLock/>},
                        {label: "Mode", icon: <FaMoon/>},
                        {label: "Contact Us", icon: <FaEnvelope/>}
                    ].map(tab => (
                    <li 
                    key={tab.label} 
                    onClick={() => handleTabClick(tab.label)}
                    className={activetab === tab.label ? "active" : ""}>
                        {tab.icon} {tab.label}
                    </li>
                    ))}
                </ul>
                </div>
            )}

            {activetab && (
                <div className={`activeTabContainer ${activetab ? "show" : ""}`}>
                    {activetab === "Account" && 
                    <div className="setting_header">
                    <div className={"userInfoContainer"}>
                        <div className='BackHeader'>
                            <button 
                            className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                            onClick={handleBack}>
                                    <FaArrowLeft/>
                            </button>
                            <h1>Edit Profile</h1>
                        </div>
                        
                        {/* Profile Picture */}
                        <div className="Profil_Pic">
                            <img src={
                                profile?.profilePicture
                                ? `http://localhost:8080/uploads/profile-pics/${profile?.profilePicture}`
                                : "/animax img source/ANIMAX_LOGO.png"
                            } alt="Profile Pic"
                            />
                            
                            <input 
                            type="file"
                            accept="image/*"
                            id="profilePictureUpload"
                            style={{ display: "none" }}
                            onChange={(e) => handleImageUpload(e)}
                            />
                            <button onClick={() => document.getElementById("profilePictureUpload").click()}>
                                <FaPen /> <span>Change Phote</span>
                            </button>
                        </div>
                        
                        {/* Update Profile Form */}
                        <div className="Update_Profile">
                                <button onClick={()=>setIsEditable(!isEditable)}>
                                    {isEditable === true ? <FaLockOpen /> : <FaLock />} <span>Edit</span> 
                                </button>
                            <form onSubmit={handleSave} className={currMode === "light"  ? "light" : "dark"}>
                                
                                {/* Username */}
                                    <div>
                                        <label>Username</label>
                                        <input 
                                        type="text"
                                        name="username"
                                        value={editFormData.username}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        />
                                        {usernameerror && <span className="error">{usernameerror}</span>}
                                    </div>
                    
                                    <div>
                                        <label>Bio</label>
                                        <textarea
                                        className="bio"
                                        name="bio"
                                        maxLength={150}
                                        rows={3}
                                        placeholder="Write about yourself"
                                        value={editFormData.bio || ""}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        />
                                    </div>
                                
                                {/* Website + Bio */}
                                    <div className="inputColums">
                                        <label>Website</label>
                                        <input 
                                        type="text"
                                        name="website"
                                        value={editFormData.website || ""}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                    
                                {/* Gender */}
                                    <div className="gender_save">
                                        <div>
                                            <label>Gender</label>
                                            <select 
                                            name="gender"
                                            onChange={handleChange}
                                            value={editFormData.gender || ""}
                                            disabled={!isEditable}
                                            >
                                                <option value="">--Select Gender--</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <button type="submit">Save</button>
                                    </div>
                            </form>
                                
                                {/* Account Created Date */}
                                <p className="Account_Created">
                                    <span>Account Created On </span>{profile?.createdAt}
                                </p>
                            </div>
                        </div>
                    </div>
                    }
                
                    {activetab === "Privacy" &&
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
                    }
                
                    {activetab === "Mode" &&
                    <div className='setting_header'>
                    <div className="Mode_Input_container">
                        <div className='BackHeader'>
                            <button 
                            className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                            onClick={handleBack}>
                                    <FaArrowLeft/>
                            </button>
                            <h1>Change Theme</h1>
                        </div>

                        <div className="Mode_Input">
                     <input 
                     type="radio" 
                     value="light" 
                     name='theme'
                     checked={currMode === "light"}
                     onChange={()=> changeCurrMode("light")}/>
                     <span onClick={()=> changeCurrMode("light")}  className='mouseCursor'>Light</span>
                         </div>

                         <div className="Mode_Input">
                     <input 
                     type="radio" 
                     value="dark" 
                     name='theme'
                     checked={currMode === "dark"}
                     onChange={()=> changeCurrMode("dark")} />
                     <span onClick={()=> changeCurrMode("dark")} className='mouseCursor'>Dark</span>
                     </div>

                  
                     </div>
                    </div>
                    }

                    {activetab === "Contact Us" &&
                    <div className='Contact_Container setting_header'> 
                        <div className='BackHeader'>
                            <button 
                            className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                            onClick={handleBack}>
                                    <FaArrowLeft/>
                            </button>
                            <h1>Contact Us</h1>
                        </div>
                 <div className="foot-container">
                    <div className="des">
                    <div className="logo">
                    <span><img src="/animax img source/ANIMAX_LOGO.png" height="50px" width="50px" alt=""/></span>
                    <h1>ANIMAXX</h1>
                     </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate modi sunt aspernatur pariatur nulla libero odio, accus
                    </p>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-youtube"></i>
                    </div>
                    <div className="foot-title">
                        <h2>Know Us</h2>
                        <li>Blogs</li>
                        <li>Tearms</li>
                    </div>
                    <div className="foot-title">
                        <h2>Colaborate</h2>
                        <li>Work With Us</li>
                        <li>Partner Program</li>
                    </div>
                    <div className="foot-title">
                        <h2>contact us</h2>
                        <li><span>Address:</span> karve nagar, pune.</li>
                        <li><span>Email-Id:</span> animaxx@gamil.com</li>
                        <li><span>Phone:</span> (0741)-32146541</li>
                        <li><span>mobile:</span> +91 98741-98542</li>
                    </div>
                    </div>
                    </div>
                }
                </div>
            )}


            

        </div>

    </>
  )
}

export default Settings
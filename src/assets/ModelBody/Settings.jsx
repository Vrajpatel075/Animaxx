import React, { useEffect, useState } from 'react'
import UserService from '../../Service/UserService';
import "../ModelCss/Settings.css"
import { FaPen } from "react-icons/fa6";
import { CiLock , CiUnlock} from "react-icons/ci";
import ExitWarring from '../ModelBody/ExitWarring';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../Redux/Feature/Theme/themeSlice';

function Settings({ setCheakDiscard ,cheakdiscard ,setActiveModal}) {
    const [activetab , setActivetab]=useState("Account");
    const [userDetails , SetUserDetails] = useState({});
    const [isEditable , setIsEditable] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [usernameerror , setUsernameError ] = useState("")


    const dispatch =  useDispatch();
    const currMode = useSelector((state)=> state.theme.mode)




    const [editFormData , setEditformData] = useState({
        userId:"",
        username:"",
        bio:"",
        firstName:"",
        lastName:"",
        profilePicture:"",
        gender:"",
        dateOfBirth:""
    });

    const handleImageUpload = async (e)=>{
        const file = e.target.files[0];
        if(!file) return;

        try{
          const res = await  UserService.uploadProfilePicture(editFormData.userId , file);
          SetUserDetails(res.data);
          setEditformData(res.data);
          alert("Profile picture updated successfully!");
        }catch(error){
            alert("Failed to upload profile picture: " + error);
        }

      
    }

    useEffect(()=>{
         const userId = localStorage.getItem("userId");
         if(userId){
             UserService.getProfile(userId).then(res=>{
                SetUserDetails(res.data);
                setEditformData(res.data);
         })
         }
    },[])
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
        try{
            const res = await UserService.edit(editFormData.userId , editFormData);
            SetUserDetails(res.data);
            setIsEditable(false); 
            alert("Profile updated successfully!");
        }catch(error){
            alert("Failed to update profile: " + error);
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
            alert("OTP verified successfully! You can now change your password.");
        }else{
            alert("Invalid OTP. Please try again.");
        }
    }

// change the them / mode from profile
    const changeCurrMode = (mode) =>{
        dispatch(setMode(mode));
    }

  return (
    <>
    <div className="Setting_container" onClick={() => setCheakDiscard(true)}>
        <div className={`Setting_Model ${currMode === 'light' ? 'light' : 'dark'}`} onClick={(e) => e.stopPropagation()}>
        <h1 className='close_Settings' onClick={() => setCheakDiscard(true)} >X</h1>
            <div className="Setting_Nav">
                <ul>
                    {["Account" , "Privrcy" , "Mode" , "Contact us" ].map(tab =>(
                        <li key={tab} 
                        onClick={()=> setActivetab(tab)}
                        className={activetab === tab ? "active" : ""}>{tab}
                        </li>
                    ))}
                </ul>
            </div>


            <div className="Setting_Content">
                <h1>Settings</h1>


                {activetab === "Account"  && 
                <div className="setting_header">
                    <h1>Account</h1>
                    <div className={`setting_Container ${currMode === 'light' ? 'light' : 'dark'}`}>
                        <div className="Profil_Pic">
                           <img
                           src={
                            userDetails.profilePicture
                            ? `http://localhost:8080/uploads/profile-pics/${userDetails.profilePicture}`
                            : "/animax img source/ANIMAX_LOGO.png"
                        }
                        alt="Profile Pic"/>

                            <input type="file"
                            accept='image/*'
                            id='profilePictureUpload'
                            style={{ display: "none" }}
                            onChange={(e) => handleImageUpload(e)}
                             />
                            <button onClick={()=>{document.getElementById("profilePictureUpload").click()}}><FaPen/></button>
                        </div>
                        <div className='Edit_Button'>
                            <button onClick={()=>setIsEditable(!isEditable)}>
                                <p>
                                    <span>{isEditable === true ? <CiUnlock/> : <CiLock/>}</span> 
                                    {/* <span> Edit </span> */}
                                </p>  
                            </button>
                        </div>
                        <div className="Update_Profile">
                            <form onSubmit={handleSave}>
                                
                                <div className="userid_bio">
                                <input type="text"
                                name='userid'
                                value={editFormData.userId  || ""} 
                                onChange={handleChange}
                                style={{display:"none"}}
                                disabled={!isEditable}/>

                                <label>Bio</label><br />
                                <textarea type="text"
                                className='bio'
                                name='bio'
                                maxLength={50}
                                row={3}
                                placeholder='Write About Your Self'
                                value={editFormData.bio  || ""} 
                                onChange={handleChange}
                                disabled={!isEditable}/></div>
                                
                                <div className="two_inputs">
                                    <div className="username">
                                        <label>Username</label> 
                                        <input type="text"
                                        name='username'
                                        value={editFormData.username}
                                        onChange={handleChange} 
                                        disabled={!isEditable} />
                                        {usernameerror && <span className="error">{usernameerror}</span>}
                                    </div>
                                    
                                    <div className="email">
                                        <label>Email</label>
                                        <input type="text" 
                                        // className='email'
                                        name="email" 
                                        value={editFormData.email ||""} 
                                        onChange={handleChange} 
                                        disabled={true} 
                                        />
                                    </div>
                                </div>
                                
                                <div className="two_inputs">
                                    <div className="firstname">
                                        <label>FirstName</label>
                                        <input type="text" 
                                        name="firstName" 
                                        value={editFormData.firstName} 
                                        onChange={handleChange} 
                                        disabled={!isEditable} />
                                    </div>
                                    
                                    <div className="lastname">
                                        <label>LastName</label>
                                        <input type="text" 
                                        name="lastName" 
                                        value={editFormData.lastName} 
                                        onChange={handleChange} 
                                        disabled={!isEditable} />
                                    </div>
                                </div>

                                <div className="gender_save">
                                    <div>
                                    <label>Gender</label><br />
                                    <select name="gender" 
                                    onChange={handleChange}
                                    value={editFormData.gender || ""} 
                                    disabled={!isEditable}>
                                        <option value="">--Select Gender--</option> 
                                        <option value="Male">Male</option> 
                                        <option value="Female">Female</option> 
                                        <option value="Other">Other</option>
                                    </select>
                                    </div>

                                    <button>Save</button>
                                </div>

                            </form>

                            <p className='Account_Created'> <span>Account Created On</span>{userDetails.createdAt}</p>
                        </div>
                        <div className="About_Info">
                            
                        </div>
                    </div>
                    
                </div>}

                {activetab === "Privrcy" &&
                <div className='setting_header'>
                    <h1>Privrcy</h1>
                    <div className={`setting_Container ${currMode === 'light' ? 'light' : 'dark'}`}>
                        <h3>Personal Details</h3>
                        
                        <div className='Edit_Button'>
                            <button onClick={()=> setIsEditable(!isEditable)}>
                                <p>
                                    <span>{isEditable === true ? <CiUnlock/> : <CiLock/>}</span> 
                                    {/* <span> Edit </span> */}
                                </p>  
                            </button>
                        </div>

                         <div className="Update_Profile">
                            <form onSubmit={handleSave}>
                                <div className="two_inputs">
                                    <div>
                                        <label>Username</label> 
                                        <input type="text"
                                        name='username'
                                        value={editFormData.username}
                                        onChange={handleChange} 
                                        disabled={!isEditable} />
                                    </div>
                                    
                                    <div>
                                        <label>Email</label>
                                        <input type="text" 
                                        name="email" 
                                        value={editFormData.email ||""} 
                                        onChange={handleChange} 
                                        disabled={true} />
                                    </div>
                                </div>
                                <div className="two_inputs">
                                    <div>
                                        <label>Password</label> 
                                        <input type="password"
                                        name='password'
                                        value={editFormData.password || ""}
                                        onChange={handleChange} 
                                        disabled={!isEditable || !isOtpVerified}/>
                                    </div>
                                    
                                    <div>
                                        <label>Enable Password Change</label>
                                        <input type="button" 
                                        value={"Genrate OTP"} 
                                        onClick={handleotp}/>
                                    </div>
                                    {generatedOtp && !isOtpVerified && (
                                        <div className="otp_section"> 
                                        <label>Enter OTP</label> 
                                        <input type="text" 
                                        maxLength={6} 
                                        value={otp} 
                                        onChange={(e) => setOtp(e.target.value)} 
                                        />

                                    <button type="button" 
                                    className='Verify_otp'
                                    onClick={handleVerifyOtp}> Verify OTP </button>
                                    </div>
                                    )}

                                </div>
                                <div className='save_btn'>
                                    <button>Save</button>
                                </div>
                            </form>
                            </div>


                    </div>
                </div>
                }
                
                {activetab === "Mode" &&
                <div className='setting_header'>
                     <h1>Mode</h1>

                     <div className="Mode_Input_container">
                        <div className="Mode_Input">
                     <input 
                     type="radio" 
                     value="light" 
                     name='theme'
                     checked={currMode === "light"}
                     onChange={()=> changeCurrMode("light")}/>
                     <span>Light</span>
                         </div>

                         <div className="Mode_Input">
                     <input 
                     type="radio" 
                     value="dark" 
                     name='theme'
                     checked={currMode === "dark"}
                     onChange={()=> changeCurrMode("dark")} />
                     <span>Dark</span>
                     </div>

                  
                     </div>
                </div>
                }

                {activetab === "Contact us" &&
                <div className='Contact_Container setting_header'> 
                    <h1>Contact us </h1>
                 <div className={`foot-container ${currMode === "light" ? "light" : "dark"}`}>
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
        </div>
    </div>

    { cheakdiscard &&(
        <ExitWarring
        currMode={currMode} 
        setCheakDiscard={setCheakDiscard} 
        setActiveModal={setActiveModal} 
        />
    )}
    </>
  )
}

export default Settings
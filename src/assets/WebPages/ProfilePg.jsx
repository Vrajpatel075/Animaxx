import React, { useEffect, useState } from 'react'
import "../WebPagesCss/ProfilePg.css"
import { data, useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import NavigationPannel from '../htmlBlocks/NavigationPannel';
import UniversalNav from '../htmlBlocks/UniversalNav';

function ProfilePg({setIsLoggedIn}) {
    const [profile , setProfile]=  useState({});
    const [navOpen, setNavOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
            const userId = localStorage.getItem("userId");
            if(userId){
                 UserService.getProfile(userId).then(res =>{
                setProfile(res.data);
            })}
        },[]);

    const handleLogout = async()=>{
        try{
            await UserService.logout();
            localStorage.removeItem("userId")
            localStorage.removeItem("userEmail")
            setIsLoggedIn(false);
            alert("logout successfully")
            navigate("/");
        }catch(error){
            alert("Logout failed!" +  error);
        }
    };

  return (
  <>
  <div className="profilNav">
    <UniversalNav 
    navOpen={navOpen}
    setNavOpen={setNavOpen}
    currMode="light"
    showSearch={false}  
    setIsLoggedIn={setIsLoggedIn} 
    />
</div>
    <div className='Profile-Container'>
        <div className="Profile-Img-Container">
            <div className='Profil-Pic'>
            <img  src={profile.profilePicture || "/animax img source/ANIMAX_LOGO.png"} alt="Profile Pic" />
            </div>
            <div className="Profile-Content">
                <h1 className='userName'>{profile.username || "Loading..."}</h1>
                <p className='Disc'>{profile.bio || "loding..."}</p>
                <p className='Profile-Achivement'>Likes <span>12K</span></p> 
                <div className="Edit-Profile">
                    {/* <button onClick={handleProfileEdits}>Edit</button> */}
                </div>
            </div>
            <div className='Settings'>
                {/* <button onClick={OpenSettings}>Setting</button> */}
                <button onClick={handleLogout}>Logout</button>
            </div>

           
            
        </div>
        <div className="Activity-Nav">
            <ul>
                <li className='Post'>Post</li>
                <li className='Save'>Save</li>
            </ul>
        </div>
        <div className="Uploded-Post"></div>
        <div className="Saved-post"></div>
    </div>
  </>
  )
}

export default ProfilePg
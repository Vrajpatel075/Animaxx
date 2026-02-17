import React, { useEffect, useState } from 'react'
import "../WebPagesCss/ProfilePg.css"
import { data, useNavigate } from 'react-router-dom';
import { MdOutlineEditNote } from "react-icons/md";
import UserService from '../../Service/UserService';
import UniversalNav from '../htmlBlocks/UniversalNav';
import Settings from '../htmlBlocks/Settings';


// currMode and SetCurrMode in for passing to Setting.jsx page as props not used in this page
function ProfilePg({setIsLoggedIn , currMode ,setCurrMode}) {
    const [profile , setProfile]=  useState({});
    const [navOpen, setNavOpen] = useState(false);
    const [isSettingOn , setIsSettingOn] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
            const userId = localStorage.getItem("userId");
            if(userId){
                 UserService.getProfile(userId).then(res =>{
                setProfile(res.data);
            })}
        },[<Settings/>]);

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
            <img  src={profile.profilePicture 
            ? `http://localhost:8080/uploads/profile-pics/${profile.profilePicture}`
            : "/animax img source/ANIMAX_LOGO.png"} alt="Profile Pic" />
            </div>
            <div className="Profile-Content">
                <div className='first-last-name'><h1>{profile.firstName}</h1><h1>{profile.lastName}</h1>
                <span onClick={()=>{setIsSettingOn(!isSettingOn)}}><MdOutlineEditNote/></span>
                </div>
                <h3 className='userName'>@{profile.username || "Loading..."}</h3>
                <p className='Disc'>{profile.bio || "loding..."}</p>
                <p className='Profile-Achivement'> 
                    <span>Likes 12K</span>
                    <span>Post 10</span>
                </p> 

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


    {isSettingOn && <Settings setIsSettingOn={setIsSettingOn} currMode={currMode} setCurrMode={setCurrMode}/>}
  </>
  )
}

export default ProfilePg
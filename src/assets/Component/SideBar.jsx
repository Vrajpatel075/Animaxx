import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react'
import { BsBellFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GoHomeFill } from 'react-icons/go'
import { IoMdSettings } from 'react-icons/io'
import { LuCirclePlus } from 'react-icons/lu'
import { MdOutlineExplore } from 'react-icons/md'
import { TbLogout2 } from 'react-icons/tb'
import "./Sidebar.css"
import { useSelector } from 'react-redux';
import ExitWarring from './ExitWarring';

function SideBar() {
    

    const cheakLogin = localStorage.getItem("userId");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const currMode = useSelector((state)=>state.theme.mode);
    const {profile , userId } = useSelector((state) => state.auth);

  return (
    <>
    <div className={`sidebar  ${currMode === "light" ? "light" : "dark" }`}>
      
      <div>
      {/* Profile */}
      <NavLink to="/" className="nav-item HideForMd">
        <div className='logoContainmer'>
        <img src="/animax-img/ANIMAX_LOGO.png" alt="LOGO" />
        </div>
       <span className="label">Animaxx</span>
      </NavLink>
      </div>

      {/* Home */}
      <div className='BottomBar'>
      <NavLink to="/" className="nav-item">
        <span className="icon"><GoHomeFill /></span>
        <span className="label">Home</span>
      </NavLink>

      {/* Explore dropdown */}
      <NavLink to="/Search" className="nav-item">
        <span className="icon"><MdOutlineExplore/></span>
        <span className="label">Explore</span>
      </NavLink>

      {/* Post */}
      <NavLink to="/post" className="nav-item" >
        <span className="icon"><LuCirclePlus/></span>
        <span className="label">Post</span>
      </NavLink>

      {/* Notifications */}
      <NavLink to="/notifications" className="nav-item HideForMd">
        <span className="icon"><BsBellFill/></span>
        <span className="label">Notifications</span>
      </NavLink>


      <NavLink to={cheakLogin ? `/ProfilePg/${cheakLogin}` : "/SignUp"} className="nav-item ShowForMd">
        <div className="profile-img">
          <img src={
            profile?.profilePicture
            ? `http://localhost:8080/uploads/profile-pics/${profile?.profilePicture}`
            : "/animax-img/animaxx_default_user_profile_picture.png"
            } alt="" />
        </div>
      </NavLink>
      </div>

      <div>
      {/* Settings */}
      <NavLink to="/settings" className="nav-item HideForMd">
        <span className="icon"><IoMdSettings/></span>
        <span className="label">Settings</span>
      </NavLink>

      {/* Logout */}
      {cheakLogin && (
      <NavLink className="nav-item HideForMd"  onClick={()=> setShowLogoutModal(true)}>
        <span className="icon"><TbLogout2/></span>
        <span className="label">Logout</span>
      </NavLink>
      )}
      </div>
    </div>

    {showLogoutModal && (
      <ExitWarring
      WarringModel={"logoutWarring"}
      onCancel={() => setShowLogoutModal(false)}
      />
    )}
    </>

    
  )
}

export default SideBar
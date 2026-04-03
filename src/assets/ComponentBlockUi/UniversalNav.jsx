import React, { useEffect, useRef, useState } from 'react';
import '../ComponentBlockCss/UniversalNav.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import SignInCheak from '../ModelBody/SignInCheak';
import { fetchuserdata, logoutUser } from '../Redux/authSlice';
import ExitWarring from '../ModelBody/ExitWarring';
import { FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

function UniversalNav({ navOpen, setNavOpen, showSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Redux state
  const { userId, profile, isLoggedIn } = useSelector((state) => state.auth);
  const currMode = useSelector((state) => state.theme.mode);

  // dropdown
  const [isDropdownOpen , setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const navItems = [
    { label: 'GALLERY', paths: ['/Gallery', '/ViewedPost'] },
    { label: 'BLOGS', paths: ['/BlogsPg'] },
    { label: 'SHOP', paths: ['/ShopPg'] },
    { label: 'COMMUNITY', paths: ['/CommunityPg'] },
  ];


  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowSignInModal(false)
    } else {
      setShowSignInModal(true);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchuserdata(userId));
    }
  }, [userId, dispatch]);

  

  return (
    <>
      <div className={`side-nav ${navOpen ? 'show' : ''}`}>
        <div className="side-nav-header">
          <button
            className="toggle-close-nav-btn"
            onClick={() => setNavOpen(false)}
            aria-label="close sidebar"
          >
            ✖
          </button>

          <div className="Animaxx-Logo mouseCursor">
            <img
              src="/animax img source/ANIMAX_LOGO.png"
              alt="logo"
              onClick={() => navigate('/')}
            />
          </div>
        </div>

        <nav className="VirticalNav">
          <div className="routeLinks">
            {isLoggedIn && (
              <NavLink
                to={`/ProfilePg/${userId}`}
                className={({ isActive }) => (isActive ? 'active-link' : 'nav_link')}
                onClick={() => setNavOpen(false)}
              >
                PROFILE
              </NavLink>
            )}
            {navItems.map(({ label, paths }) => {
              const isActive = paths.some(p => location.pathname.startsWith(p));
              return (
                <NavLink
                  key={label}
                  to={paths[0]}
                  className={isActive ? 'active-link' : 'nav_link'}
                  onClick={() => setNavOpen(false)}
                >
                  {label}
                </NavLink>
              );
            })}
          </div>

          {isLoggedIn && (
            <div className='logoutButton'>
              <div className="logoutLink" onClick={() => setShowLogoutModal(true)}>
                <a>Logout</a>
                <div className="LogoutIcon">
                  <TbLogout2 />
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {showLogoutModal && (
        <ExitWarring
        WarringModel={"logoutWarring"}
        onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {navOpen && (
        <div className="wallpaper-overlay" onClick={() => setNavOpen(false)} />
      )}

      <div
        className={`SearchAndNavPannel wallpaper-nav ${
          currMode === 'light' ? 'light' : 'dark'
        }`}
      >
        <button
          className="toggle-open-nav-btn"
          onClick={() => setNavOpen(true)}
          aria-label="open sidebar"
        >
          <span> ☰ </span>
        </button>

        {/* display serchbar as per needs */}
        {showSearch && (
          <div className="responsive_nav_searh">
            <input className="search_input" type="text" placeholder="Search..." />
            <div className="search_icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        )}

        {/* dropdown on profile picture click */}
        <div className="dropdown" ref={dropdownRef}>

          <div 
          className="Animaxx-logo mouseCursor" 
          tabIndex={0}
          onClick={() => setIsDropdownOpen(prev => !prev)}>

          <img 
          src={
              profile?.profilePicture
                ? `http://localhost:8080/uploads/profile-pics/${profile.profilePicture}`
                : profile?.gender === "male"
                ? "/animax img source/animaxx_male_user_profile_picture.png"
                : profile?.gender === "female"
                ? "/animax img source/animaxx_female_user_profile_picture.png"
                : "/animax img source/animaxx_default_user_profile_picture.png"
            }
            alt="logo"
          onClick={handleProfileClick}/>

          </div>


          <div className={`dropdown-menu 
          ${ isDropdownOpen ? "active" : "" }
          ${currMode === "light" ? "light" : "dark"}`}>
            <div className='Profile-info'>
              <div>
                {/* user profile picture */}
                <div className="profile-img">
                  <img src={`http://localhost:8080/uploads/profile-pics/${profile.profilePicture}`} alt="" />
                </div>
              </div>
              
              {/* user first and last namewith email */}
              <div className="profile-content">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <p>{profile.email}</p>
              </div>
            </div>

          <hr />

          {/* Profile */}
          <p 
          className='dropdownlink'
          onClick={()=> navigate(`/ProfilePg/${userId}`)}>
            <span><FaUser/></span> 
            <span>Profile</span>
          </p>

          {/* settings */}
          <p 
          className='dropdownlink'>
            <span><IoMdSettings/></span>
            <span>Settings</span>
          </p>

          <hr/>

          {/* Logout */}
          <p
          onClick={() => setShowLogoutModal(true)}
          className='dropdownlink'>
            <span><TbLogout2/></span>
            <span>Logout</span>
          </p>
          </div>

        </div>
      
      </div>


         {showSignInModal && (
            <SignInCheak onClose={() => setShowSignInModal(false)} />
          )}
    </>
  );
}

export default UniversalNav;

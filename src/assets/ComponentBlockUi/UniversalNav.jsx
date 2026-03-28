import React, { useEffect, useState } from 'react';
import '../ComponentBlockCss/UniversalNav.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import UserService from '../../Service/UserService';
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import LogoutModel from '../ModelBody/LogoutModel';
import SignInCheak from '../ModelBody/SignInCheak';

function UniversalNav({ navOpen, setNavOpen, showSearch, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cheakLogin = localStorage.getItem("userId");
  const [profile , setProfile] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const currMode = useSelector((state)=>state.theme.mode);

  const navItems = [
    { label: 'GALLERY', paths: ['/Gallery', '/ViewedPost'] },
    { label: 'BLOGS', paths: ['/BlogsPg'] },
    { label: 'SHOP', paths: ['/ShopPg'] },
    { label: 'COMMUNITY', paths: ['/CommunityPg'] },
  ];

  const handleLogout = async () => {
    try {
      await UserService.logout();
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      setIsLoggedIn(false);
      alert("Logout successfully");
      navigate("/");
    } catch (error) {
      alert("Logout failed! " + error);
    }
  };
  
  const handleProfileClick = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    navigate(`/ProfilePg/${userId}`);
  } else {
    setShowSignInModal(true); 
  }
};


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      UserService.getProfile(userId).then(res => {
        setProfile(res.data);
      });
    }
  }, []);

  return (
    <>
      <div className={`wallpaper-side-nav ${navOpen ? 'show' : ''}`}>
        <div className="mob-nav-header">
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
            {cheakLogin && (
              <NavLink
                to={`/ProfilePg/${cheakLogin}`}
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
                  to={paths[0]} // main navigation target
                  className={isActive ? 'active-link' : 'nav_link'}
                  onClick={() => setNavOpen(false)}
                >
                  {label}
                </NavLink>
              );
            })}
          </div>

          {cheakLogin && (
            <div className='logoutButton'>
              <div className="logoutLink" onClick={()=>setShowLogoutModal(true)}>
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
        <LogoutModel
        onConfirm={handleLogout} 
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

        {showSearch && (
          <div className="responsive_nav_searh">
            <input className="search_input" type="text" placeholder="Search..." />
            <div className="search_icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        )}

        <div className="Animaxx-logo">
          <img
            src={
                profile.profilePicture
                  ? `http://localhost:8080/uploads/profile-pics/${profile.profilePicture}`
                  : profile.gender === "male"
                  ? "/animax img source/animaxx_male_user_profile_picture.png"
                  : profile.gender === "female"
                  ? "/animax img source/animaxx_female_user_profile_picture.png"
                  : "/animax img source/animaxx_default_user_profile_picture.png"
              }
            alt="logo"
            onClick={handleProfileClick}
          />
          {showSignInModal &&
          <SignInCheak onClose={()=>setShowSignInModal(false)}/>}
        </div>
      </div>
    </>
  );
}

export default UniversalNav;

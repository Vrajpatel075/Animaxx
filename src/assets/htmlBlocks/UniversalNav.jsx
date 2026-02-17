import React, { useState } from 'react';
import '../cssBlocks/UniversalNav.css';
import { NavLink, useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

function UniversalNav({ navOpen, setNavOpen, currMode, showSearch, setIsLoggedIn }) {
  const navigate = useNavigate();
  const cheakLogin = localStorage.getItem("userId");

  const [activeLink, setActiveLink] = useState('WALLPAPERS');

  const navItems = [
    { label: 'WALLPAPERS', path: '/WallpaperPg' },
    { label: 'BLOGS', path: '/BlogsPg' },
    { label: 'SHOP', path: '/ShopPg' },
    { label: 'COMMUNITY', path: '/CommunityPg' },
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

          <div className="Animaxx-Logo">
            <img
              src="/animax img source/ANIMAX_LOGO.png"
              alt="logo"
              height="45"
              onClick={() => navigate('/')}
            />
          </div>
        </div>

        <nav className='VirticalNav'>
          <div className="routeLinks">
            {cheakLogin && (
              <NavLink 
              to="/ProfilePg"
              className={({ isActive }) => (isActive ? 'active-link' : 'nav_link')}
              onClick={() => setNavOpen(false)}>PROFILE
              </NavLink>
            )}
            {navItems.map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) => (isActive ? 'active-link' : 'nav_link')}
                onClick={() => setNavOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {cheakLogin && (
            <div>
              <div className="logoutLink" onClick={handleLogout}>
              <a>Logout</a>
              <div className='LogoutIcon'>
                <TbLogout2/>
              </div>
              </div>
              
            </div>
          )}
        </nav>
      </div>

      {navOpen && (
        <div className="wallpaper-overlay" onClick={() => setNavOpen(false)} />
      )}

      <div
        className={`SearchAndNavPannel wallpaper-nav ${
          currMode === 'light' ? 'day' : 'night'
        }`}
      >
        <button
          className="toggle-open-nav-btn"
          onClick={() => setNavOpen(true)}
          aria-label="open sidebar"
        >
          ☰
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
            src="/animax img source/ANIMAX_LOGO.png"
            alt="logo"
            onClick={() => navigate('/ProfilePg')}
          />
        </div>
      </div>
    </>
  );
}

export default UniversalNav;

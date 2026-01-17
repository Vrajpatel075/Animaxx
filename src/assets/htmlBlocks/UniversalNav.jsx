import React, { useState } from 'react';
import '../cssBlocks/UniversalNav.css';
import { useNavigate } from 'react-router-dom';

function UniversalNav({ navOpen, setNavOpen, currMode }) {
  const navigateToHome = useNavigate();

  // Default active link
  const [activeLink, setActiveLink] = useState('WALLPAPERS');

  const navItems = [
    { label: 'WALLPAPERS', path: '/WallpaperPg' },
    { label: 'BLOGS', path: '/SignIn' },
    { label: 'SHOP', path: '/SignUp' },
    { label: 'COMMUNITY', path: '/SignUp' },
    { label: 'GET STARTED', path: '/SignUp' },
  ];

  return (
    <>
      <div className={`wallpaper-side-nav ${navOpen ? 'show' : ''}`}>
        <button
          className="toggle-close-nav-btn"
          onClick={() => setNavOpen(false)}
          aria-label="close sidebar">
          ✖
        </button>

        <nav className='navlinks'>
          {navItems.map(({ label, path }) => (
            <a
              key={label}
              href={path}
              className={activeLink === label ? 'active-link' : ''}
              onClick={() => setActiveLink(label)}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      {navOpen && (
        <div className="wallpaper-overlay"onClick={() => setNavOpen(false)}/>
      )}

 
      <div className={`SearchAndNavPannel wallpaper-nav ${currMode === 'light' ? 'day' : 'night'}`}>
        <button
          className="toggle-open-nav-btn" onClick={() => setNavOpen(true)} aria-label="open sidebar">
          ☰
        </button>

        <div className="responsive_nav_searh">
          <input className="search_input" type="text" placeholder="Search..."/>
          <div className="search_icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="Animaxx-logo">
          <img src="/animax img source/ANIMAX_LOGO.png" alt="logo" onClick={() => navigateToHome('/')}/>
        </div>
      </div>
    </>
  );
}

export default UniversalNav;

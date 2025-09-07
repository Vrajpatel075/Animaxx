import React, { useEffect, useState } from 'react';
import '../cssBlocks/NavigationPannel.css';
import { NavLink } from 'react-router-dom';

function NavigationPannel() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [activeLink, setActiveLink] = useState('');

// Scroll behavior for desktop only
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only apply scroll-hide logic if screen is wider than 700px
    if (window.innerWidth >= 700) {
      setShowNavbar(scrollTop < lastScrollTop);
      setLastScrollTop(scrollTop);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollTop]);


  // Media query listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(width < 700px)');
    const handleMediaChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMediaChange);
    setIsMobile(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Sidebar toggle
  const opensidebar = () => {
    setSidebarOpen(true);
  };

  const closesidebar = () => {
    setSidebarOpen(false);
  };

  // Handle link click
  const handleLinkClick = (to) => {
    setActiveLink(to);
    closesidebar();
  };

  return (
    <>
      <button
        id="open-side-nav"
        className="toggle-nav-btn"
        onClick={opensidebar}
        aria-label="open sidebar"
        aria-expanded={sidebarOpen}
        aria-controls="navbar"
      >
        ☰
      </button>

      <div
        className={`navigation ${sidebarOpen ? 'show' : ''}`}
        id="navbar"
        style={{
          top: showNavbar ? '0' : '-100%',
          transition: 'top 0.3s ease-in-out',
        }}
        {...(isMobile ? { inert: '' } : {})}
      >
        <div className="header-sec">
          <nav>
            <div className="mob-logo">
              <img src="/animax img source/ANIMAX_LOGO.png" alt="img" />
              <button
                id="close-side-nav"
                className="toggle-nav-btn"
                onClick={closesidebar}
                aria-label="close sidebar"
              >
                X
              </button>
            </div>
            <div className="nav-pages">
              {[
                { label: 'WALLPAPERS', to: '/WallpaperPg' },
                { label: 'BLOGS', to: '/SignIn' },
                { label: 'SHOP', to: '/SignUp' },
                { label: 'COMMUNITY', to: '/SignUp' },
                { label: 'GET STARTED', to: '/SignUp' },
              ].map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) => `nav_link ${isActive ? 'active-link' : ''}`}
                  onClick={() => handleLinkClick(to)}
                  aria-current={activeLink === to ? 'page' : undefined}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {sidebarOpen && (
        <div id="overlay" onClick={closesidebar} aria-hidden="true"></div>
      )}
    </>
  );
}

export default NavigationPannel;

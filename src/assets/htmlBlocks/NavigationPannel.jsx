import React, { useEffect, useState } from 'react';
import '../cssBlocks/NavigationPannel.css';
import { NavLink } from 'react-router-dom';

function NavigationPannel() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  // Scroll behavior for desktop only
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    const handleMediaChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    setIsMobile(mediaQuery.matches);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <>
      <button
        id="open-side-nav"
        className="toggle-nav-btn"
        onClick={() => setSidebarOpen(true)}
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
        {...(isMobile ? { inert: true } : {})}
      >
        <div className="header-sec">
          <nav>
            <div className="mob-logo">
              <img src="/animax img source/ANIMAX_LOGO.png" alt="logo" />
              <button
                id="close-side-nav"
                className="toggle-nav-btn"
                onClick={() => setSidebarOpen(false)}
                aria-label="close sidebar"
              >
                ✖
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
                  onClick={() => setSidebarOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {sidebarOpen && <div id="overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
}

export default NavigationPannel;

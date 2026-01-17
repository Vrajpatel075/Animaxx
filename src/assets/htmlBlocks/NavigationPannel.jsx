import React, { useEffect, useState } from 'react';
import '../cssBlocks/NavigationPannel.css';
import { NavLink } from 'react-router-dom';

function NavigationPannel() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Hide navbar on scroll (desktop only) */
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 760) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setShowNavbar(scrollTop < lastScrollTop);
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      {/* ===== Mobile / Tablet Top Bar ===== */}
      <div className="mobile-topbar">
        <button
          className="toggle-open-nav-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="open menu"
        >
          ☰
        </button>

        <img
          src="/animax img source/ANIMAX_LOGO.png"
          alt="logo"
          className="topbar-logo"
        />
      </div>

      {/* ===== Sidebar / Desktop Navbar ===== */}
      <div
        className={`navigation ${sidebarOpen ? 'show' : ''}`}
        style={{ top: showNavbar ? '0' : '-100%' }}
      >
        <div className="header-sec">
          <nav>
            <div className="mob-logo">
              <button
                className="toggle-close-nav-btn"
                onClick={() => setSidebarOpen(false)}
                aria-label="close menu"
              >
                ✖
              </button>

              <img
                src="/animax img source/ANIMAX_LOGO.png"
                alt="logo"
                height="45"
              />
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
                  className="nav_link"
                  onClick={() => setSidebarOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="nav-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default NavigationPannel;

import React, { useEffect, useState } from 'react';
import '../ComponentBlockCss/NavigationPannel.css';
import { NavLink } from 'react-router-dom';

function NavigationPannel() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const cheakLogin = localStorage.getItem("userId");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 760) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowNavbar(scrollTop < lastScrollTop);
      setLastScrollTop(scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const NavItems = [
    { label: 'Gallery', to: '/Gallery' },
    { label: 'BLOGS', to: '/BlogsPg' },
    { label: 'SHOP', to: '/ShopPg' },
    { label: 'COMMUNITY', to: '/CommunityPg' },
  ];

  return (
    <>
      <div className="mobile-topbar">
        <button
          className="toggle-open-nav-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="open menu"
        >
          ☰
        </button>
        <img src="/animax img source/ANIMAX_LOGO.png" alt="logo" className="topbar-logo" />
      </div>

        <div className={`navigation ${sidebarOpen ? 'show' : ''}`} style={{ top: showNavbar ? '0' : '-100%' }}>
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
              <img src="/animax img source/ANIMAX_LOGO.png" alt="logo" height="45" />
            </div>

            <div className="nav-pages">
              <NavLink to={cheakLogin ? "/ProfilePg" : "/SignUpUserinfo"} 
              className={({ isActive }) => 
              window.location.pathname === "/" 
              ? "active-link" 
              : isActive 
              ? "active-link" 
              : "nav_link" } 
              onClick={() => setSidebarOpen(false)} > 
              {cheakLogin ? "Profile" : "Get Started"} 
              </NavLink>

              {NavItems.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav_link')}
                  onClick={() => setSidebarOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {sidebarOpen && <div className="nav-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
}

export default NavigationPannel;

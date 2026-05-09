import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { TbLogout2 } from "react-icons/tb";
import { fetchuserdata } from '../Redux/authSlice';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';

import './UniversalNav.css';
import SignInCheak from '../Component/SignInCheak';
import ExitWarring from '../Component/ExitWarring';
import PostService from "../../Service/PostService"
import { useSafeNavigate } from '../../OfflineBackup/useSafeNavigate';
import { BsBellFill } from 'react-icons/bs';

function UniversalNav({ navOpen, setNavOpen, showSearch }) {
  const safeNavigate = useSafeNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // for search
  const [query, setQuery] = useState("");
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [limit, setLimit] = useState(6);


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
      setIsDropdownOpen(prev => !prev)
    } else {
      setShowSignInModal(true);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchuserdata(userId));
    }
  }, [userId, dispatch]);

  // for serch
  const handleChange = async (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value.length > 1) {
    try {
      const res = await PostService.searchPosts(value);

      // Collect titles, usernames, and tags
      const titles = res.map(post => post.title);
      const usernames = res.map(post => post.user.username);
      const tags = res.flatMap(post => post.tags || []);

      let filteredSuggestions;

      if (usernames.some(u => u.includes(value))) {
        // Unique usernames
        const uniqueUsernames = [...new Set(
          usernames.filter(u => u.includes(value))
        )];
        filteredSuggestions = uniqueUsernames;

      } else if (tags.some(tag => tag.includes(value))) {
        // Unique tags
        const uniqueTags = [...new Set(
          tags.filter(tag => tag.includes(value))
        )];
        filteredSuggestions = uniqueTags;

      } else {
        // Unique titles
        const matchedTitles = titles.filter(t => t.includes(value));
        const uniqueTitles = [...new Set(matchedTitles)];

        // Order: starts-with first
        filteredSuggestions = uniqueTitles.sort((a, b) => {
          const aStarts = a.toLowerCase().startsWith(value.toLowerCase());
          const bStarts = b.toLowerCase().startsWith(value.toLowerCase());

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return a.localeCompare(b);
        });
      }

       setAllSuggestions(filteredSuggestions);
    } catch (err) {
      console.error("Search error", err);
    }
  } else {
    setAllSuggestions([]);
  }
};


  

  return (
    <>
      <div className={`side-nav ${navOpen ? 'show' : ''} ShowForMD ${currMode ==="light"?"light":"dark"}`}>
        <div className="side-nav-header">
          <button
            className="toggle-close-nav-btn"
            onClick={() => setNavOpen(false)}
            aria-label="close sidebar"
          >
            ✖
          </button>


          <div className="ProfileLogo mouseCursor">
            <img
              src="/animax-img/ANIMAX_LOGO.png"
              alt="logo"
              onClick={() => ('/')}
            />
          </div>
        </div>

        <nav className="sideNavLinks">
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



    <div className={`SearchAndNavPannel ${currMode === 'light' ? 'light' : 'dark'}`}>
        
        <button
          className="toggle-open-nav-btn ShowForMD"
          onClick={() => setNavOpen(true)}
          aria-label="open sidebar"
        >
          <span> ☰ </span>
        </button>
 
        
      {navOpen && (
        <div className='nav-overlay' onClick={() => setNavOpen(false)} />
      )}

      {/* display serchbar as per needs */}
      {showSearch && (
          <div className="responsive_nav_searh ">
            <input
            className="search_input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            />
            
          <div className="search_icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          
          {allSuggestions.length > 0 && (
            <div className={`search_suggestions ${limit === 6 ? "collapsed" : ""}
            ${currMode ==="light" ? "light" : "night"}`}>
              {allSuggestions.slice(0, limit).map((item, idx) => (
                <div key={idx} className="suggestion_item">
                  <span>{item}</span>
                </div>
              ))}
              
              {allSuggestions.length > 6 && (
                <div
                className="suggestion_footer mouseCursor"
                onClick={() => setLimit(limit === 6 ? 10 : 6)}
                >
                  {limit === 6 ? "View more results" : "View fewer results"}
                </div>
              )}
              </div>
            )}
          </div>
      )}

      {/* dropdown on profile picture click */}
      <div className="dropdown HideForMd" ref={dropdownRef}>

          <div 
          className="ProfileLogo mouseCursor" 
          tabIndex={0}
          onClick={handleProfileClick}>
            <img src={
              profile?.profilePicture
                ? `http://localhost:8080/uploads/profile-pics/${profile?.profilePicture}`
                : "/animax-img/animaxx_default_user_profile_picture.png"
            }
            alt="logo"/>
          </div>

          <div className={`dropdown-menu 
          ${ isDropdownOpen ? "active" : "" }
          ${currMode === "light" ? "light" : "night"}`}>
            <div className='Profile-info'>
              <div>
                {/* user profile picture */}
                <div className="profile-img">
                  <img src={
                    profile?.profilePicture
                    ? `http://localhost:8080/uploads/profile-pics/${profile?.profilePicture}`
                    : "/animax-img/animaxx_default_user_profile_picture.png"
                    } alt="" />
                </div>
              </div>
              
              {/* user first and last namewith email */}
              <div className="profile-content">
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>
              </div>
            </div>

          <hr />

          {/* Profile */}
          <p 
          className='dropdownlink mouseCursor'
          onClick={()=> safeNavigate(`/ProfilePg/${userId}`)}>
            <span><FaUser/></span> 
            <span>Profile</span>
          </p>

          {/* Notifications */}
          <p 
          className='dropdownlink mouseCursor'>
            <span><IoNotifications/></span> 
            <span>Notifications</span>
          </p>

          {/* settings */}
          <p 
          className='dropdownlink mouseCursor'
          onClick={()=> safeNavigate("/Settings")}>
            <span><IoMdSettings/></span>
            <span>Settings</span>
          </p>

          <hr/>

          {/* Logout */}
          <p
          className='dropdownlink mouseCursor'
          onClick={() => setShowLogoutModal(true)}>
            <span><TbLogout2/></span>
            <span>Logout</span>
          </p>
          </div>

      </div>

      <div className='AnimaxxTitle ShowForMD'>
        <div className='AnimaxxLogo'>
          <img src="/animax-img/ANIMAX_LOGO.png" alt="Logo" />
        </div>
        <h2>Animaxx</h2>
      </div>

      <div>
        <NavLink to="/notifications" className="nav-item ShowForMD">
        <span className={`icon ${currMode==="light"?"light":"dark"}`}><FaRegHeart/></span>
        </NavLink>
      </div>
      
    </div>
    


      {showSignInModal && (
            <SignInCheak onClose={() => setShowSignInModal(false)} />
      )}

      {showLogoutModal && (
        <ExitWarring
        WarringModel={"logoutWarring"}
        onCancel={() => setShowLogoutModal(false)}
        />
      )}
          

    </>
  );
}

export default UniversalNav;

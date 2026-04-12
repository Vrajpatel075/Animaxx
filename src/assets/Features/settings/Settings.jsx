import React, { useEffect, useState } from 'react';
import "./Settings.css";
import { FaArrowLeft, FaEnvelope, FaLock, FaMoon, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../Redux/themeSlice';
import { fetchuserdata } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import EditProfile from './Accounts/EditProfile';
import PersonalDetails from './Privacy/PersonalDetails';

function Settings() {
  const [activetab, setActivetab] = useState(window.innerWidth > 650 ? "Account" : null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currMode = useSelector((state) => state.theme.mode);
  const { userId, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      dispatch(fetchuserdata(userId));
    }
  }, [userId, dispatch]);

  const handleTabClick = (tab) => {
    if (window.innerWidth <= 650) {
      setActivetab(tab);
      setIsNavVisible(false);
    } else {
      setActivetab(tab);
      setIsNavVisible(true);
    }
  };

  const handleBack = () => {
    setActivetab("Account");
    setIsNavVisible(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650 && activetab === null) {
        setActivetab("Account"); // default to Account on desktop
      }
      if (window.innerWidth <= 650 && isNavVisible && activetab === "Account") {
        setActivetab(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activetab, isNavVisible]);

  const changeCurrMode = (mode) => {
    dispatch(setMode(mode));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`settingContainer ${currMode === 'light' ? 'light' : 'dark'}`}>

      {isNavVisible && (
        <div className="Setting_Nav">
          <div className='BackHeader'>
            <button
              className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </button>
            <h2>Settings</h2>
          </div>
          <ul className='mouseCursor'>
            {[
              { label: "Account", icon: <FaUser /> },
              { label: "Privacy", icon: <FaLock /> },
              { label: "Mode", icon: <FaMoon /> },
              { label: "Contact Us", icon: <FaEnvelope /> }
            ].map(tab => (
              <li
                key={tab.label}
                onClick={() => handleTabClick(tab.label)}
                className={activetab === tab.label ? "active" : ""}
              >
                {tab.icon} {tab.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activetab && (
        <div className={`activeTabContainer ${activetab ? "show" : ""}`}>
            
          {activetab === "Account" && <EditProfile handleBack={handleBack} />}

          {activetab === "Privacy" && <PersonalDetails handleBack={handleBack} />}

          {activetab === "Mode" && (
            <div className='setting_header'>
              <div className="Mode_Input_container">
                <div className='BackHeader'>
                  <button
                    className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                    onClick={handleBack}
                  >
                    <FaArrowLeft />
                  </button>
                  <h1>Change Theme</h1>
                </div>
                <div className="Mode_Input">
                  <input
                    type="radio"
                    value="light"
                    name='theme'
                    checked={currMode === "light"}
                    onChange={() => changeCurrMode("light")}
                  />
                  <span onClick={() => changeCurrMode("light")} className='mouseCursor'>Light</span>
                </div>
                <div className="Mode_Input">
                  <input
                    type="radio"
                    value="dark"
                    name='theme'
                    checked={currMode === "dark"}
                    onChange={() => changeCurrMode("dark")}
                  />
                  <span onClick={() => changeCurrMode("dark")} className='mouseCursor'>Dark</span>
                </div>
              </div>
            </div>
          )}

          {activetab === "Contact Us" && (
            <div className='Contact_Container setting_header'>
              <div className='BackHeader'>
                <button
                  className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
                  onClick={handleBack}
                >
                  <FaArrowLeft />
                </button>
                <h1>Contact Us</h1>
              </div>
              {/* Contact Us content */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;

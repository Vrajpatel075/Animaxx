import React, { useEffect, useState } from 'react';
import "./Settings.css";
import { FaAngleRight, FaArrowLeft, FaBookmark, FaComment, FaEnvelope, FaHeart, FaLock, FaMoon, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { fetchuserdata } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import EditProfile from './Accounts/EditProfile';
import PersonalDetails from './Privacy/PersonalDetails';
import Theme from './Theme/Theme';
import { BsBellFill } from 'react-icons/bs';
import { ImBlocked } from 'react-icons/im';
import { FaShieldAlt } from 'react-icons/fa';
import LikedPost from './Activity/LikedPost';
import SavedPost from './Activity/SavedPost';
import CommentedPost from './Activity/CommentedPost';

function Settings() {
  const [activetab, setActivetab] = useState(window.innerWidth > 650 ? "Edit Profile" : null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currMode = useSelector((state) => state.theme.mode);
  const { userId, profile } = useSelector((state) => state.auth);

  const settingsGroups = [
    {
      heading: "About You",
      items: [
        { label: "Edit Profile", icon: <FaUser /> },
        { label: "Notification", icon: <BsBellFill /> },
      ],
    },
    {
      heading: "Your Activity",
      items: [
        { label: "Likes", icon: <FaHeart /> },
        { label: "Comments", icon: <FaComment /> },
        { label: "Saved", icon: <FaBookmark /> },
      ],
    },
    {
      heading: "Privacy & Security",
      items: [
        { label: "Account Privacy", icon: <FaLock /> },
        { label: "Personal Details", icon: <FaShieldAlt /> },
        { label: "Blocked", icon: <ImBlocked /> },
      ],
    },
    {
      heading: "Appearance",
      items: [{ label: "Mode", icon: <FaMoon /> }],
    },
    {
      heading: "Support",
      items: [{ label: "Contact Us", icon: <FaEnvelope /> }],
    },
  ];


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
    setActivetab("Edit Profile");
    setIsNavVisible(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650 && activetab === null) {
        setActivetab("Edit Profile"); // default to Edit Profile on desktop
      }
      if (window.innerWidth <= 650 && isNavVisible && activetab === "Edit Profile") {
        setActivetab(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activetab, isNavVisible]);

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
            {settingsGroups.map(group => (
              <ul key={group.heading} className="mouseCursor">
                <span>{group.heading}</span>
                {group.items.map(tab => (
                  <li
                  key={tab.label}
                  onClick={() => handleTabClick(tab.label)}
                  className={activetab === tab.label ? "active" : ""}
                  >
                    <span>{tab.icon} {tab.label}</span> {<span className='RightArrowicon'><FaAngleRight/></span>}
                    </li>
                  ))}
                </ul>
                ))}
          </ul>
      </div>
      )}

      {activetab && (
        <div className={`activeTabContainer ${activetab ? "show" : ""}`}>
            
          {activetab === "Edit Profile" && <EditProfile handleBack={handleBack} />}

          {activetab === "Likes" && <LikedPost handleBack={handleBack}/>}

          {activetab === "Comments" && <CommentedPost handleBack={handleBack}/>}

          {activetab === "Saved" && <SavedPost handleBack={handleBack}/>}

          {activetab === "Personal Details" && <PersonalDetails handleBack={handleBack} />}

          {activetab === "Mode" && <Theme handleBack={handleBack} />}

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

                      <div className="foot-container">
                    <div className="des">
                    <div className="logo">
                    <span><img src="/animax-img/ANIMAX_LOGO.png" height="50px" width="50px" alt=""/></span>
                    <h1>ANIMAXX</h1>
                     </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate modi sunt aspernatur pariatur nulla libero odio, accus
                    </p>
                    <i className="fab fa-facebook-f mouseCursor"></i>
                    <i className="fab fa-instagram mouseCursor"></i>
                    <i className="fab fa-twitter mouseCursor"></i>
                    <i className="fab fa-youtube mouseCursor"></i>
                    </div>
                    <div className="foot-title">
                        <h2>Know Us</h2>
                        <li>Blogs</li>
                        <li>Tearms</li>
                        <li>Rearch</li>
                        <li>Labs</li>
                    </div>
                    <div className="foot-title">
                        <h2>Colaborate</h2>
                        <li>Work With Us</li>
                        <li>Partner Program</li>
                        <li>Providers</li>
                        <li>Groups</li>
                    </div>
                    <div className="foot-title">
                        <h2>contact us</h2>
                        <li><span>Address:</span> karve nagar, pune.</li>
                        <li><span>Email-Id:</span> animaxx@gamil.com</li>
                        <li><span>Phone:</span> (0741)-32146541</li>
                        <li><span>mobile:</span> +91 98741-98542</li>
                    </div>

        </div>
            
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;

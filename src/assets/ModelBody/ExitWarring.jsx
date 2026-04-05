import React, { useState } from 'react'
import "../ModelCss/ExitWarring.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Redux/authSlice';
import toast from 'react-hot-toast';
    
    function ExitWarring({ setActiveModal ,WarringModel,onCancel }) {
      const currMode = useSelector((state)=>state.theme.mode);
      const dispatch = useDispatch();
      const navigate = useNavigate()
;
      
        const handleLogout = () => {
          dispatch(logoutUser()).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              toast.success("Logout successfully" ,{ style:{
                background:"#ff9239",
                font:"1rem"
              }});
              navigate("/");
            } else {
              toast.error("Logout failed!");
            }
          });
        };
  return (
    <>
      {WarringModel === "exitWarring" &&
      <div className='ModelContainer' onClick={(e) => e.stopPropagation()}>
      <div className={`discardBox ${currMode === "light" ? "light" : "dark"}`}>
        <h2>Are You Sure?</h2>
        <p>Unsaved changes will be lost.</p>
        <div className='discardbtn'>
          <button className='continueBtn' onClick={onCancel}>
            Continue
          </button>
          <button className='exitBtn' onClick={() => {
            onCancel();
            setActiveModal(null);  
          }}>
            Exit
          </button>
        </div>
      </div>
      </div>
      }

      {WarringModel === "logoutWarring" &&
          <div className='ModelContainer' onClick={(e) => e.stopPropagation()}>
            <div className={`discardBox ${currMode === "light" ? "light" : "dark"}`}>
              <h2>Confirm Logout</h2>
              <p>Are you sure you want to log out?</p>
              
              <div className='discardbtn'>
                <button className='continueBtn' onClick={handleLogout}>
            Logout
          </button>
          <button className='exitBtn' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
      }

    </>
  );
}

export default ExitWarring;

import React from 'react';
import '../ModelCss/ExitWarring.css';
import { useSelector } from 'react-redux';

function LogoutModel({ onConfirm, onCancel }) {
  const currMode = useSelector((state)=>state.theme.mode);

  return (
    <div className='discardContainer' onClick={(e) => e.stopPropagation()}>
      <div className={`discardBox ${currMode === "light" ? "light" : "dark"}`}>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>

        <div className='discardbtn'>
          <button className='continueBtn' onClick={onConfirm}>
            Logout
          </button>
          <button className='exitBtn' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModel;

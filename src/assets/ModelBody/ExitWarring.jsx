import React from 'react'
import "../ModelCss/ExitWarring.css"
import { useSelector } from 'react-redux';
    
    function ExitWarring({ setCheakDiscard, setActiveModal  }) {
      const currMode = useSelector((state)=>state.theme.mode);
  return (
    <div className='ModelContainer' onClick={(e) => e.stopPropagation()}>
      <div className={`discardBox ${currMode === "light" ? "light" : "dark"}`}>
        <h2>Are You Sure?</h2>
        <p>Unsaved changes will be lost.</p>
        <div className='discardbtn'>
          <button className='continueBtn' onClick={() => setCheakDiscard(false)}>
            Continue
          </button>
          <button className='exitBtn' onClick={() => {
            setCheakDiscard(false); 
            setActiveModal(null);  
          }}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitWarring;

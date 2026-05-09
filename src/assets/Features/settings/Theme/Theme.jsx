import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../Redux/themeSlice';

function Theme({handleBack}) {

    const dispatch = useDispatch();
    const currMode = useSelector((state) =>state.theme.mode);
    
    const changeCurrMode = (mode) => {
        dispatch(setMode(mode));
    };


  return (
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
  )
}

export default Theme
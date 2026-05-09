import React, { useState } from 'react'
import "./ExitWarring.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Redux/authSlice';
import toast from 'react-hot-toast';
import { useSafeNavigate } from '../../OfflineBackup/useSafeNavigate';
import CommentsService from '../../Service/CommentsService';
    
    function ExitWarring({ closeModal ,WarringModel,onCancel ,commentId , onDeleteSuccess }) {

      const currMode = useSelector((state)=>state.theme.mode);
      const dispatch = useDispatch();
      
      const safeNavigate = useSafeNavigate();
      
        const handleLogout = () => {
          dispatch(logoutUser()).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              toast.success("Logout successfully" ,{ style:{
                background:"#ff9239",
                font:"1rem"
              }});
              safeNavigate("/");
            } else {
              toast.error("Logout failed!");
            }
          });
        };
        
        const handleCommentDelete = async () => {
          try {
            await CommentsService.deleteComment(commentId);
            toast.success("Comment deleted successfully", {
              style: { background: "#ff9239", font: "1rem" }
            });
            if (onDeleteSuccess) onDeleteSuccess(commentId); // update parent state
            closeModal();
          } catch (err) {
            console.error("Error deleting comment:", err);
            toast.error("Failed to delete comment");
          }
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
            closeModal();
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
      
      {WarringModel === "DeleteComment" &&
        <div className='ModelContainer' onClick={(e) => e.stopPropagation()}>
          <div className={`discardBox ${currMode === "light" ? "light" : "dark"}`}>
            <h2>You can't undo this action</h2>
            <p>Are you sure you want to continue?</p>
            <div className='discardbtn'>
              <button className='continueBtn' onClick={handleCommentDelete}>
                Delete
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

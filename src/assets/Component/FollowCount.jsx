import React, { useEffect, useState } from 'react';
import "./FollowCount.css";
import { useSelector } from 'react-redux';
import FollowService from '../../Service/FollowService';
import { useParams } from 'react-router-dom';
import { useSafeNavigate } from '../../OfflineBackup/useSafeNavigate';

function FollowCount({ onClose, FollowTitle }) {
  const currMode = useSelector((state) => state.theme.mode);
  const { userId } = useSelector((state) => state.auth);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followStatuses, setFollowStatuses] = useState({});
  const paramId = useParams(); 
  const safeNavigate = useSafeNavigate();

useEffect(() => {
  if (FollowTitle === "Followers") {
    FollowService.getAllFollowers(paramId.userId).then(data => {
      setFollowers(data);
      data.forEach(f => {
        Promise.all([
          FollowService.checkFollow(f.userId, userId), // do I follow them?
          FollowService.checkFollow(userId, f.userId)  // do they follow me?
        ]).then(([iFollow, followsMe]) => {
          setFollowStatuses(prev => ({
            ...prev,
            [f.userId]: { iFollow, followsMe }
          }));
        });
      });
    });
  }else if (FollowTitle === "Following") {
    FollowService.getAllFollowing(paramId.userId).then(data => {
      setFollowing(data);
      data.forEach(f => {
        Promise.all([
          FollowService.checkFollow(f.userId, userId), // do I follow them?
          FollowService.checkFollow(userId, f.userId)  // do they follow me?
        ]).then(([iFollow, followsMe]) => {
          setFollowStatuses(prev => ({
            ...prev,
            [f.userId]: { iFollow, followsMe }
          }));
        });
      });
    });
  }
}, [FollowTitle, paramId.userId, userId]);


const changeFollowStatus = (targetUserId) => {
  const current = followStatuses[targetUserId]?.iFollow;
  setFollowStatuses(prev => ({
    ...prev,
    [targetUserId]: { ...prev[targetUserId], iFollow: !current }
  }));

  FollowService.toggleFollow(targetUserId, userId).then(() => {
    FollowService.checkFollow(targetUserId, userId).then(iFollow => {
      setFollowStatuses(prev => ({
        ...prev,
        [targetUserId]: { ...prev[targetUserId], iFollow }
      }));
    });
  });
};


  return (
    <div className='ModelContainer' onClick={onClose}>
      <div
        className={`FollowContainer ${currMode === "light" ? "light" : "dark"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="titleModel">
          <h2>{FollowTitle}</h2>
        </div>
        <div className='follow-list'>
          {FollowTitle === "Followers" ? (
            followers.length > 0 ? (
              followers.map((f) => (
                <div 
                key={f.userId}
                className="SigleUserContainet mouseCursor" 
                onClick={()=>{
                  onClose();
                  safeNavigate(`/ProfilePg/${f.userId}`)
                }}> 
                  <div className='UserDetail'>
                    <div className='ProfilPicContainer'>
                      <img
                        src={
                          f?.profilePicture
                            ? `http://localhost:8080/uploads/profile-pics/${f.profilePicture}`
                            : "/animax-img/animaxx_default_user_profile_picture.png"
                        }
                        alt="User"
                      />
                    </div>
                    <h4>{f.username}</h4>
                  </div>
                    <button className="FollowBtn" onClick={() => changeFollowStatus(f.userId)}>
                        {followStatuses[f.userId]?.iFollow
                        ? "Unfollow"
                        : followStatuses[f.userId]?.followsMe
                        ? "Follow Back"
                        : "Follow"}
                    </button>
                </div>
              
              ))
            ) : (
              <p>No followers yet.</p>
            )
          ) : FollowTitle === "Following" ? (
            following.length > 0 ? (
              following.map((f) => (
                <div 
                key={f.userId} 
                className="SigleUserContainet mouseCursor" 
                onClick={()=>{
                  onClose();
                  safeNavigate(`/ProfilePg/${f.userId}`);
                  }}>
                  <div className='UserDetail'>
                    <div className='ProfilPicContainer'>
                      <img
                        src={
                          f?.profilePicture
                            ? `http://localhost:8080/uploads/profile-pics/${f.profilePicture}`
                            : "/animax-img/animaxx_default_user_profile_picture.png"
                        }
                        alt="User"
                      />
                    </div>
                    <h4>{f.username}</h4>
                  </div>
                    <button className='FollowBtn' onClick={() => changeFollowStatus(f.userId)}>
                        {followStatuses[f.userId]?.iFollow
                        ? "Unfollow"
                        : followStatuses[f.userId]?.followsMe
                        ? "Follow Back"
                        : "Follow"}
                    </button>
                </div>
              ))
            ) : (
              <p>Not following anyone yet.</p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FollowCount;

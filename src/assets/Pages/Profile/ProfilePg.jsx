import React, { useEffect, useState } from 'react'
import "./ProfilePg.css"
import {useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineEditNote } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { useSafeNavigate } from '../../../OfflineBackup/useSafeNavigate';

import UniversalNav from '../../Component/UniversalNav';
import UploadPost from '../../Features/posts/UploadPost';
import SelectedUserPost from '../../Features/posts/SelectedUserPost';
import PostCard from '../../Features/posts/PostCard';

import ProfileSkeleton from '../../LodingSkeleton/ProfileSkeleton';


import UserService from '../../../Service/UserService';
import FollowService from "../../../Service/FollowService";
import PostService from '../../../Service/PostService';
import SideBar from '../../Component/SideBar';
import FollowCount from '../../Component/FollowCount';



// SetCurrMode is for passing to Setting.jsx page as props not used in this page
function ProfilePg() {
    const navigate =  useNavigate();
    const safeNavigate = useSafeNavigate();
    const [navOpen, setNavOpen] = useState(false);
    const [Loading , setLoading] = useState(false);
    const [cheakdiscard , setCheakDiscard] = useState(false);
    
    // to show the user post or blogs uploded by user
    const [activeModal, setActiveModal] = useState(null);
    const [activeSection , setActiveSection] = useState("Posts");
    const [selectedPostId, setSelectedPostId] = useState(null);

    // to fetch user uploded posts
    const [userposts , setUserPosts]= useState([]);
    
    // to cheak profile page is of same login user or other users
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [followBtn , SetFollowbtn]  = useState(false);
    const {userId : paramId } =  useParams();
    const [profiledata , setProfileData] = useState({});

    // TO handle Followers
    const [isFollowing , setIsFollowing] = useState(false);
    const [followersCount , setfollowersCount] = useState(0);
    const [followingCount , setfollowingCount] = useState(0);
    const [showFollows , setShowFollows] = useState(false);4
    const [followTitle , setFollowTitle] = useState("");

    // redux
    const {userId} = useSelector((state)=>state.auth);
    const currMode = useSelector((state)=>state.theme.mode);

    // cheak is active user profile or other user profile
    useEffect(() => {
        if (!paramId || !userId) return;
        setIsOwnProfile(String(paramId) === String(userId));
    }, [paramId, userId]);

    // to fetch user data and post data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await UserService.getProfile(paramId);
                setProfileData(res.data);

                const posts = await PostService.getUserPost(paramId);
                setUserPosts(posts);
            
            } catch (err) {
            console.error("Error fetching profile:", err);
        
        } finally {
            setLoading(false);
        }};
        if(paramId) fetchData();
    }, [paramId]);
        
    //  to cheak the width of screen so layout can be changes 
    useEffect(()=>{
        const handleResize = () =>{
            if(window.innerWidth<=500){
                SetFollowbtn(true);
            }else{
                SetFollowbtn(false);
            }
        }
        
    handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    },[])

    useEffect(()=>{
        if(!paramId || !userId) return;
        fetchFollowData();
    },[paramId , userId])


    // handle follow data fetching
    const fetchFollowData = async ()=>{
        try{
            const followers = await FollowService.getFollowerCount(paramId);
            setfollowersCount(followers);
            
            const following = await FollowService.getFollowingCount(paramId);
            setfollowingCount(following);

            const isFollow = await FollowService.checkFollow(paramId, userId);
            setIsFollowing(isFollow);

        }catch(err){
            console.error("Error fetching follow data:", err);
        }
    }

    // handleToggleFollow 
    const handleToggleFollow = async () => {
        const newState = !isFollowing;
        
        try {
            setIsFollowing(newState);
            setfollowersCount(prev => newState ? prev + 1 : prev - 1);
            
            await FollowService.toggleFollow(paramId, userId);
        } catch (err) {
            console.error("Error toggling follow:", err);
            
            // rollback UI
            setIsFollowing(!newState);
            setfollowersCount(prev => newState ? prev - 1 : prev + 1);
        }
    };



    // loading...
    if(Loading){
        return <ProfileSkeleton/>;
    }

  return (
  <>
  <div className="profile-body">
  <div className="SidebarContainer">
    <SideBar />
  </div>

   <div className="main-content">
    {/* to change the header according  to user */}
    <div className='BackHeader'>
        <button className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
        onClick={()=>navigate(-1)}>
          <FaArrowLeft/>
        </button>
        <h3>{profiledata.username}</h3>
      </div>
    
    
    <div className={`Profile-Container ${isOwnProfile === true ? "NavOn" : ""}`} >
        <div className="Profile-Img-Container">
            <div className='Profil-Pic'>
            <img src={ profiledata?.profilePicture
            ? `http://localhost:8080/uploads/profile-pics/${profiledata?.profilePicture}`
            : "/animax-img/animaxx_default_user_profile_picture.png"
        } alt="Profile Pic"/>

            </div>
            <div className="Profile-Content">
                <div className='first-last-name'><h1>{profiledata?.name}</h1>
                
                {isOwnProfile && 
                <span className='edit-btn' onClick={() => safeNavigate("/settings")}><MdOutlineEditNote/></span>
                }
                
                </div>
                <div className='userName'>
                <h3>@{profiledata?.username || "Loading..."}</h3>
                {!followBtn && (
                    <div className='Activity_button'>
                        {isOwnProfile ?(
                            <button onClick={() => setActiveModal("addpost")}> Add Poat </button>
                        ):(
                            <button onClick={handleToggleFollow}> 
                                {isFollowing ? "Unfollow" : "Follow"}    
                            </button>
                        )}
                    </div>
                )}</div>
                
                <p className='Profile-Achivement'> 
                    <span className='Achivement-count mouseCursor'>
                        <span>{profiledata.totalPosts || "0"}</span> 
                        <span>Post</span>
                    </span>
                    <span className='Achivement-count mouseCursor'
                    onClick={()=>{setShowFollows(true), setFollowTitle("Followers")}}>
                        <span>{followersCount}</span>
                        <span>Followers</span>
                    </span>
                    <span className='Achivement-count mouseCursor'
                    onClick={()=>{setShowFollows(true), setFollowTitle("Following")}}>
                        <span>{followingCount}</span>
                        <span>Following</span>
                    </span>
                </p> 
        </div>

        </div>

        <pre className='Disc'>{profiledata.bio || ""}</pre>
        
        {followBtn && (
            <div className='Activity_button'>
                {isOwnProfile ? (
                    <button onClick={() => setActiveModal("addpost")}>
                      Add Poat
                    </button>
                ):(
                    <button onClick={handleToggleFollow}>
                      {isFollowing ? "Unfollow" : "Follow"}    
                    </button>
                )}
                {isOwnProfile ? (
                    <button className='settings' onClick={() => safeNavigate("/settings")}>
                      Edit
                    </button>
                ):(
                    <button className='message'>
                      Message
                    </button>
                )}
            
        </div>
        )}
        

        <div className="Activity-Nav">
            <ul className='mouseCursor'>
                <li className='Post' onClick={()=>setActiveSection("Posts")}>Post</li>
                <li className='Save' onClick={()=>setActiveSection("Blogs")}>Blogs</li>
            </ul>
        </div>
    </div>
 


    {/* so see post of blogs */}
    {activeSection === "Posts" && 
      <div className="PostContainer">
         <div className="post-list">
          {userposts.map((post) => (
            <PostCard
            key={post.postId}
            post={post}
            onClick={() => setSelectedPostId(post.postId)}/>
          )) || 
          <h2> Upload Post</h2>}
        </div>
      </div>}

    {activeSection  === "Blogs" &&
      <div>
        <h1>Upload Blog</h1>
      </div>}
      </div>
  </div>

    {/* open selected post from user profile */}
    {selectedPostId  && <SelectedUserPost
    postId={selectedPostId} 
    posts={userposts}
    setSelectedPostId={setSelectedPostId}
    closeModal={() => setSelectedPostId(null)} />
    }

    {/* upload post */}
    {activeModal === "addpost" && ( 
        <UploadPost 
        setCheakDiscard={setCheakDiscard} 
        cheakdiscard={cheakdiscard} 
        setUserPosts={setUserPosts}
        setActiveModal={setActiveModal}
        closeModal={() => setActiveModal(null)} />
    )}

    {showFollows && (
        <FollowCount 
        FollowTitle={followTitle}
        onClose={()=>setShowFollows(false)}
        />
    )}
  </>
  )
}

export default ProfilePg
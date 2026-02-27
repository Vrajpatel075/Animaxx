import React, { useEffect, useState } from 'react'
import "../WebPagesCss/ProfilePg.css"
import { data, Link, useNavigate } from 'react-router-dom';
import { MdOutlineEditNote } from "react-icons/md";
import UserService from '../../Service/UserService';
import UniversalNav from '../htmlBlocks/UniversalNav';
import Settings from '../ModelBody/Settings';
import UploadPost from '../ModelBody/UploadPost';
import PostService from '../../Service/PostService';
import SelectedUserPost from '../ModelBody/SelectedUserPost';


// SetCurrMode is for passing to Setting.jsx page as props not used in this page
function ProfilePg({setIsLoggedIn , currMode ,setCurrMode}) {
    const [profile , setProfile]=  useState({});
    const [navOpen, setNavOpen] = useState(false);
    const [userposts , setUserPosts]= useState([]);
    const [cheakdiscard , setCheakDiscard] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [wordLimit , setWordLimit] = useState(5);
    const [selectedPostId, setSelectedPostId] = useState(null);


    const navigate = useNavigate();

    useEffect(()=>{
            const userId = localStorage.getItem("userId");
            if(userId){
                 UserService.getProfile(userId).then(res =>{
                setProfile(res.data );

                PostService.getUserPost(userId).then(post=>{
                setUserPosts(post)
                })
            })}
        },[<Settings/>]);

    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + ' ...';
  }

  return (
  <>
  <div className="profile-body">
  <div className="profilNav">
    <UniversalNav 
    navOpen={navOpen}
    setNavOpen={setNavOpen}
    showSearch={false}  
    currMode={currMode}
    setIsLoggedIn={setIsLoggedIn} 
    />
</div>

    <div className='Profile-Container'>
        <div className="Profile-Img-Container">
            <div className='Profil-Pic'>
            <img src={ profile.profilePicture
            ? `http://localhost:8080/uploads/profile-pics/${profile.profilePicture}`
            : profile.gender === "male"
            ? "/animax img source/animaxx_male_user_profile_picture.png"
            : profile.gender === "female"
            ? "/animax img source/animaxx_female_user_profile_picture.png"
            : "/animax img source/animaxx_default_user_profile_picture.png"
        } alt="Profile Pic"/>

            </div>
            <div className="Profile-Content">
                <div className='first-last-name'><h1>{profile.firstName}</h1><h1>{profile.lastName}</h1>
                <span className='edit-btn' onClick={() => setActiveModal("setting")}><MdOutlineEditNote/></span>
                </div>
                <h3 className='userName'>@{profile.username || "Loading..."}</h3>
                <p className='Disc'>{profile.bio || "loding..."}</p>
                <p className='Profile-Achivement'> 
                    <span className='Achivement-count'>Follwers: 1520</span>
                    <span className='Achivement-count'>Post: {profile.totalPosts}</span>
                </p> 
                <div className='Activity_button'>
                <button onClick={() => setActiveModal("addpost")}>
                      Add Poat
                </button>
                {activeModal === "addpost" && ( 
                        <UploadPost 
                        currMode={currMode} 
                        setCheakDiscard={setCheakDiscard} 
                        cheakdiscard={cheakdiscard} 
                        setActiveModal={setActiveModal}
                        closeModal={() => setActiveModal(null)} />
                    )}
                </div>
            </div>           
            
        </div>
        <div className="Activity-Nav">
            <ul>
                <li className='Post'>Post</li>
                <li className='Save'>Save</li>
            </ul>
        </div>
    </div>
 


    
    {/* {displayPosts &&  */}
    <div className="post_container">
         <div className="wallpaper-list">
          {userposts.map((post) => (
            <div 
            className="postCard" 
            key={post.postId}
            onClick={() => setSelectedPostId(post.postId)}  
            >
              
              <img 
              src={post.imageUrl} 
              alt={`post ${post.postId}`}
              onClick={() => setSelectedPostId(post.postId)}
              />
              <h4 className="postTitle">{post.postOwner}</h4>
              <p className="postDescription">
                {truncateText(post.description, wordLimit)}
                {post.description}
              </p>
            </div>
          )) || "Upload Post"}
        </div>
    </div>
       </div>


    {activeModal === "setting" && (
        <Settings 
        currMode={currMode} 
        cheakdiscard={cheakdiscard} 
        setCurrMode={setCurrMode} 
        setCheakDiscard={setCheakDiscard} 
        setActiveModal={setActiveModal}
        closeModal={() => setActiveModal(null)}
        />
    )}

    {selectedPostId  && 
    <SelectedUserPost
    currMode={currMode} 
    postId={selectedPostId} 
    closeModal={() => setSelectedPostId(null)} />}
  </>
  )
}

export default ProfilePg
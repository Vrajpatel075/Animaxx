import React, { useEffect, useState } from 'react'
import "../WebPagesCss/ProfilePg.css"
import { MdOutlineEditNote } from "react-icons/md";
import UserService from '../../Service/UserService';
import UniversalNav from '../ComponentBlockUi/UniversalNav';
import Settings from '../ModelBody/Settings';
import UploadPost from '../ModelBody/UploadPost';
import PostService from '../../Service/PostService';
import SelectedUserPost from '../ModelBody/SelectedUserPost';
import PostCard from '../ComponentBlockUi/PostCard';
import ProfileSkeleton from '../LodingSkeleton/SkeletonUi/ProfileSkeleton';
import { useParams } from 'react-router-dom';



// SetCurrMode is for passing to Setting.jsx page as props not used in this page
function ProfilePg({setIsLoggedIn}) {
    const [profile , setProfile]=  useState({});
    const [navOpen, setNavOpen] = useState(false);
    const [userposts , setUserPosts]= useState([]);
    const [cheakdiscard , setCheakDiscard] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [activeSection , setActiveSection] = useState("Posts");
    const [followBtn , SetFollowbtn]  = useState(false);
    const [Loading , setLoading] = useState(false);
    const {userId} = useParams();
    // const userId = id || localStorage.getItem("userId");
    
    
    useEffect(() => {
        console.log("Route ID:", userId);
        const fetchData = async () => {
            if (!userId) return;
            
            try {
                setLoading(true);
                const res = await UserService.getProfile(userId);
                setProfile(res.data);
                const posts = await PostService.getUserPost(userId);
                setUserPosts(posts);
            
            } catch (err) {
            console.error("Error fetching profile:", err);
        
        } finally {
            setLoading(false);
        }};
        fetchData();
    }, [userId]);
        
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

    if(Loading){
        return <ProfileSkeleton/>;
    }
  return (
  <>
  <div className="profile-body">
  <div className="profilNav">
    <UniversalNav 
    navOpen={navOpen}
    setNavOpen={setNavOpen}
    showSearch={false}  
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
                <div className='userName'>
                <h3>@{profile.username || "Loading..."}</h3>
                {!followBtn && (
                    <div className='Activity_button'>
                        <button onClick={() => setActiveModal("addpost")}>
                            Add Poat
                        </button>
                    </div>
                )}</div>
                
                <p className='Profile-Achivement'> 
                    <span className='Achivement-count'>
                        <span>{ "0" || profile.totalPosts}</span> 
                        <span>Post</span>
                    </span>
                    <span className='Achivement-count'>
                        <span>0</span> 
                        <span>Followers</span>
                    </span>
                    <span className='Achivement-count'>
                        <span>0</span> 
                        <span>Following</span>
                    </span>
                </p> 
        </div>

        </div>

        <pre className='Disc'>{profile.bio|| ""}</pre>
        {followBtn && (
            <div className='Activity_button'>
                <button onClick={() => setActiveModal("addpost")}>
                      Add Poat
                </button>
                <button onClick={() => setActiveModal("setting")}>
                      Edit
                </button>
        </div>
        )}
        

        <div className="Activity-Nav">
            <ul className='mouseCursor'>
                <li className='Post' onClick={()=>setActiveSection("Posts")}>Post</li>
                <li className='Save' onClick={()=>setActiveSection("Blogs")}>Blogs</li>
            </ul>
        </div>
    </div>
 


    
    {activeSection === "Posts" && 
    <div className="post_container">
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


    {activeModal === "setting" && (
        <Settings 
        cheakdiscard={cheakdiscard} 
        setCheakDiscard={setCheakDiscard} 
        setActiveModal={setActiveModal}
        closeModal={() => setActiveModal(null)}
        />
    )}

    
    {selectedPostId  && 
    <SelectedUserPost
    postId={selectedPostId} 
    posts={userposts}
    setSelectedPostId={setSelectedPostId}
    closeModal={() => setSelectedPostId(null)} />
    }

    {activeModal === "addpost" && ( 
        <UploadPost 
        setCheakDiscard={setCheakDiscard} 
        cheakdiscard={cheakdiscard} 
        setUserPosts={setUserPosts}
        setActiveModal={setActiveModal}
        closeModal={() => setActiveModal(null)} />
    )}
  </>
  )
}

export default ProfilePg
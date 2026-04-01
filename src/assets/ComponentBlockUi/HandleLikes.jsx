import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6';
import { IoMdHeart } from 'react-icons/io';
import LikesService from '../../Service/LikesService';
import "../ComponentBlockCss/HandleLikes.css"
import { useSelector } from 'react-redux';
import SignInCheak from '../ModelBody/SignInCheak';

function HandleLikes({post}) {
        const [likes , setLikes] = useState(post.likes);
        const [liked, setLiked] = useState(false);
        const [showSignInModal, setShowSignInModal] = useState(false);
        
        // redux
        const {userId , isLoggedIn } = useSelector((state)=>state.auth);

    useEffect(()=>{
        setLikes(post.likes);
        const fetchUserLikedPosts = async () => {
            try{
              if (!userId) return;
                    const likedPosts = await LikesService.getLikedPosts(userId);
                     let isLiked = false;
                      for (let i = 0; i < likedPosts.length; i++){
                        if (likedPosts[i].postId === post.postId) {
                           isLiked = true;
                           break;
                        }
                      }
                    setLiked(isLiked);
                    
                  }catch(err){
                      console.log("Skipping liked posts fetch:", err.message);
                  }
                }
                fetchUserLikedPosts();
            },[userId , post.postId, post.likes])

    const handleLikeToggle = async ()=>{
          if (!isLoggedIn || !userId) {
            setShowSignInModal(true);
            return;
            }
      try{
        const res = await LikesService.toggleLike(userId, post.postId)
        setLiked(res.liked);
        setLikes(res.count);
      }catch (err){
        console.error("Error toggling like:", err);
      }
    }

        
  return (
    <div>
        <span className="icons" onClick={handleLikeToggle}>
            {liked ? <IoMdHeart className='RedHeart'/>  :<FaRegHeart/> }
            <span className='ActiveCount'>{likes}</span>
        </span> 
         {showSignInModal && <SignInCheak />}
    </div>
  )
}

export default HandleLikes
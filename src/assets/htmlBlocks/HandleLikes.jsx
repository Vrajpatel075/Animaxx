import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6';
import { IoMdHeart } from 'react-icons/io';
import LikesService from '../../Service/LikesService';
import "../cssBlocks/HandleLikes.css"

function HandleLikes({post}) {
        const [likes , setLikes] = useState(post.likes);
        const [liked, setLiked] = useState(false);
        const userId = localStorage.getItem("userId");

    useEffect(()=>{
        setLikes(post.likes);
        const fetchUserLikedPosts = async () => {
            try{
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
                    console.log(err)
                  }
                }
                fetchUserLikedPosts();
            },[userId , post.postId])

    const handleLikeToggle = async ()=>{
      try{
        const res = await LikesService.toggleLike(userId, post.postId)
        setLiked(res.liked);
        setLikes(res.count);
        console.log(res)
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
    </div>
  )
}

export default HandleLikes
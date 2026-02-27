import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostService from '../../Service/PostService';
import { FaAngleUp, FaChevronDown, FaRegComment, FaRegHeart, FaShare } from 'react-icons/fa6';
import { FiDownload } from 'react-icons/fi';
import { HiDotsHorizontal } from 'react-icons/hi';
import "../ModelCss/SelectedUserPost.css"

function SelectedUserPost({currMode , postId , closeModal}) {
const navigate = useNavigate();
const [openComments , SetOpenComments ] = useState(false)
const [allUsersPost , SetallUsersPost] = useState([])


useEffect(()=>{
    const userId = localStorage.getItem("userId");
    if(userId){
         PostService.getUserPost(userId).then(posts =>{
            SetallUsersPost(posts)
         })
        }
},[postId])

// show all post in accept the post selected
const unselectedpost = useMemo(()=>{
  return allUsersPost.filter(p=> p.postId !==  parseInt(postId));
},[postId , allUsersPost])


// show only selected post data 
const selectedpost = useMemo(()=>{
    return allUsersPost.find(p=> p.postId === parseInt(postId)); 
},[postId ,allUsersPost , unselectedpost])


if(!selectedpost){
    return <div>Loding...</div>
}

  return (
  <>
  <div className="selectedUserPostContainer" onClick={closeModal}>
    <div className={`selectedUserPostModel ${currMode === 'light' ? 'light' : 'dark'}`}
    onClick={(e) => e.stopPropagation()}>
      
        <div className={`SelectedPostContainer ${currMode === 'light' ? 'day' : 'night'}`}>
                
          <div className="ViewedImg">
            <img src={selectedpost.imageUrl} alt={selectedpost.title} />
          </div>
          
          <div className="PostAuther">
              <h2>{selectedpost.title}</h2 >
              <p className="postDescription">
                {selectedpost.description}
                {/* {truncateText(selectedpost.description, wordLimit)} */}
              </p>
          </div>
          
          <div className='PostActivite'>
              <span className='mainicons'>
                <span className='icons'><FaRegHeart/>
                <span className='ActiveCount'>{selectedpost.likes}</span>
                </span>
                <span className='icons'><FiDownload/></span>
                <span className='icons'><HiDotsHorizontal/></span>
              </span>
              <span className='icons'><FaShare/></span>
          </div>
  
          <div className="PostComments">
            <div className="comments">
              <h2>comments</h2>
              <span className='openComments'
              onClick={() => SetOpenComments(prev => !prev)}>
                {openComments  ?<FaAngleUp/> : <FaChevronDown/>}
                </span>
            </div>
  
            <div className="CommentInput">
              <span><FaRegComment/> </span>
              <input type="text" placeholder='Comment' className={`${currMode === "light" ? "light" : "dark"}`} />
            </div>
  
            {openComments && (
            <div className="allComments">
                <div className="sigleComment">
                    <h4>Lorem, ipsum dolor.</h4>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="sigleComment">
                   <h4>Lorem, ipsum dolor.</h4>
                   <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="sigleComment">
                   <h4>Lorem, ipsum dolor.</h4>
                   <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            )}
          </div>
        </div>

        <div className="post_container">
         <div className="wallpaper-list">
          {unselectedpost.map((post) => (
            <div 
            className="postCard" 
            key={post.postId}
            onClick={()=> navigate(`/SelectedUserPost/${post.postId}`)}  >
              
              <img 
              src={post.imageUrl} 
              alt={`post ${post.postId}`}
              onClick={()=> navigate(`/SelectedUserPost/${post.postId}`)} 
              />    
            </div>
          )) || "Upload Post"}
        </div>
        </div>
        
    </div>
  </div>
  </>
  )
}

export default SelectedUserPost
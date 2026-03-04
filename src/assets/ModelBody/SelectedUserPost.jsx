import React, { useEffect, useMemo, useState } from 'react'
import { FaAngleUp, FaArrowLeft, FaChevronDown, FaRegComment, FaRegHeart, FaShare } from 'react-icons/fa6';
import { FiDownload } from 'react-icons/fi';
import { HiDotsHorizontal } from 'react-icons/hi';
import "../ModelCss/SelectedUserPost.css"
import PostCard from '../htmlBlocks/PostCard';
import Comments from '../htmlBlocks/Comments';


function SelectedUserPost({currMode , postId , closeModal , posts , setSelectedPostId}) {
// const [openComments , SetOpenComments ] = useState(false)
const [isCommentsOpen, setIsCommentsOpen] = useState(false);

// show all post in accept the post selected
const unselectedpost = posts.filter(p => p.postId !== parseInt(postId));

// show only selected post data 
const selectedpost = posts.find(p => p.postId === parseInt(postId));

  return (
  <>
  <div className="selectedUserPostContainer" onClick={closeModal}>
    <div className={`selectedUserPostModel ${currMode === 'light' ? 'light' : 'dark'}`}
    onClick={(e) => e.stopPropagation()}>
      
        <div className={`SelectedPost ${currMode === 'light' ? 'day' : 'night'}`}>

           <div className="backBtn">
            <h2>
              <span onClick={closeModal}> <FaArrowLeft/></span> 
              <span>Posts</span></h2>
          </div>
                
          <div className="ViewedImg">
            <img src={selectedpost.imageUrl} alt={selectedpost.title} />
          </div>
          
          <div className="PostAuther">
              <h2>{selectedpost.title}</h2 >
              <p className="postDescription">
                {selectedpost.description}
              </p>
          </div>

          <div className='PostActivite'>
            <span className='mainicons'>
              <span className='icons'><FaRegHeart/>
              <span className='ActiveCount'>{selectedpost.likes}</span>
              </span>
              <span className='icons'><FaRegComment
              onClick={() => setIsCommentsOpen(prev => !prev)}/></span>
              <span className='icons'><FaShare/></span>
            </span>
              <span className='icons'><HiDotsHorizontal/></span>
            </div>
  
          {isCommentsOpen &&
          <Comments
          currMode={currMode}/>}

          
        </div>

        <div className={`post_container ${currMode === 'light' ? 'light' : 'night'}`}>
         <div className="wallpaper-list">
          {unselectedpost.map((post) => (
            <PostCard
            key={post.postId}
            currMode={currMode}
            post={post}
            onClick={() => setSelectedPostId(post.postId)}/>
          ))}
        </div>
        </div>
        
    </div>
  </div>
  </>
  )
}

export default SelectedUserPost
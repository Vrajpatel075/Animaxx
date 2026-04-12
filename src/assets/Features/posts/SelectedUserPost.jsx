import React, {useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import SelectedPost from './SelectedPost';
import "./SelectedUserPost.css"
import { useSelector } from 'react-redux';


function SelectedUserPost({ postId , closeModal , posts , setSelectedPostId}) {
const [isDescriptionOpen , setIsDescriptionOpen] = useState(false)

// cheak theme
const currMode = useSelector((state)=> state.theme.mode);

// show all post in accept the post selected
const unselectedpost = posts?.filter(p => p.postId !== parseInt(postId)) || [];

// show only selected post data 
const post = posts?.find(p => p.postId === parseInt(postId));


  return (
  <>
  <div className="selectedUserPostContainer" onClick={closeModal}>
    <div className={`selectedUserPostModel ${currMode === 'light' ? 'light' : 'dark'}`}
    onClick={(e) => e.stopPropagation()}>

        <div>
          <div className='BackHeader'>
              <button className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`} 
              onClick={closeModal} > <FaArrowLeft/></button> 
              <h2>Posts</h2>
          </div>
          
          
        <SelectedPost
        post={post}
        isDescriptionOpen={isDescriptionOpen}
        setIsDescriptionOpen={setIsDescriptionOpen}
        />

        {unselectedpost.map((post) => (
            <SelectedPost
            key={post.postId}
            post={post}
            isDescriptionOpen={isDescriptionOpen}
            setIsDescriptionOpen={setIsDescriptionOpen}
            onClick={() => {
              setSelectedPostId(post.postId);
              setIsDescriptionOpen(false);
            }}
            />
        ))}
      </div>
        
    </div>
  </div>
  </>
  )
}

export default SelectedUserPost
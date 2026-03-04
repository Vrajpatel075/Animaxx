import React, { useState } from 'react'
// import "../cssBlocks/SelectedPost.css"
import { FaAngleUp, FaChevronDown, FaRegComment, FaRegHeart, FaShare } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import Comments from './Comments';

function SelectedPost({post , currMode }) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); 
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [wordLimit , setWordLimit] = useState();
    


    function truncateText(text="", wordLimit=5) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + ' ...more';
    }


  return (
    <div>
        <div className={`SelectedPost ${currMode === 'light' ? 'day' : 'night'}`}>
                
                {/* <div className="Topbuttons">
                  <button className='zoomIn' onClick={() => setIsLargeView(true)}><MdOutlineZoomOutMap/></button>
                  <button>Save</button>
                </div> */}
        
                <div className='PostOwner'>
                    <div className='ProfilPic'>
                      <img className='' src={`http://localhost:8080/uploads/profile-pics/${post.user?.profilePicture}`}alt={post.user?.username} />
                    </div>
                    <div className="ProfilrUsername">
                      <span>{post.user?.username}</span>
                </div>
                    
                </div>
        
                <div className="ViewedImg">          
                  <img src={post.imageUrl} alt={post.postOwner} />
                </div>
                
                <div className="PostAuther">
                  <h3>{post.title}</h3>
                  {isDescriptionOpen ? (
                    <p className='postDescription'>{post.description}
                    <span onClick={()=> setIsDescriptionOpen(false)}> ...Show less</span>
                    </p>
                  ) : (
                     <h3 className="postDescription">
                      {truncateText(post.description, wordLimit)}
                      <span onClick={()=>setIsDescriptionOpen(true)}> ...more </span>
                    </h3>
                  )}
                  </div>
                
                <div className='PostActivite'>
                    <span className='mainicons'>
                      <span className='icons'><FaRegHeart/>
                      <span className='ActiveCount'>{post.likes}</span>
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
    </div>
  )
}

export default SelectedPost
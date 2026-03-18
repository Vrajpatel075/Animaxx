import React, { useEffect, useState } from 'react'
import "../ComponentBlockCss/SelectedPost.css"
import { FaRegComment, FaShare } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import HandleComments from './HandleComments';
import HandleLikes from './HandleLikes';
import { MdBookmarkBorder } from 'react-icons/md';
import CommentsService from '../../Service/CommentsService';
import { useSelector } from 'react-redux';

function SelectedPost({post ,setIsDescriptionOpen ,  isDescriptionOpen}) {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [wordLimit , setWordLimit] = useState();
    const [commentcount , SetCommentCount] = useState();
    const currMode = useSelector((state)=> state.theme.mode);

     useEffect(()=>{
        try{
            CommentsService.getCommentCount(post.postId).then(res => {
            SetCommentCount(res)
            })
        }catch(err){
            console.error(err);
        }
     },[post.postId])

  
    function truncateText(text="", wordLimit=5) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    }

  return (
    <div>
        <div className={`SelectedPost ${currMode === 'light' ? 'light' : 'night'}`}>
                
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
             
                <div className='PostActivite'>
                    <span className='mainicons'>
                      <HandleLikes post={post}/>
                      <span className='icons'><FaRegComment
                      onClick={() => setIsCommentsOpen(prev => !prev)}/>  <span  className='ActiveCount'>{commentcount}</span> </span>
                      <span className='icons'><MdBookmarkBorder /></span>
                      <span className='icons'><FaShare/></span>
                    </span>
                    <span className='icons'><HiDotsHorizontal/></span>
                </div>

                <div className="PostAuther">
                  <h3>{post.title}</h3>
                  {isDescriptionOpen ? (
                    <p className='postDescription'>{post.description}
                    </p>
                  ) : (
                     <h3 className="postDescription">
                      {truncateText(post.description, wordLimit)}
                      <span onClick={()=>setIsDescriptionOpen(true)}> ...more </span>
                    </h3> 
                  )}
                  {isDescriptionOpen && (
                      <div className='postDescription'>
                        {post.tags.map((tag,index)=>(
                          <span key={index}>
                            <span>#{tag} </span>
                          </span>
                        ))}
                        <span onClick={()=> setIsDescriptionOpen(false)}> ...Show less</span> 
                      </div>
                    )}
                  <span>{post.createdAt}</span>
                </div>

                {isCommentsOpen &&
                <HandleComments
                setIsCommentsOpen={setIsCommentsOpen}
                postId={post.postId}
                />}
        
        
              </div>  
    </div>
  )
}

export default SelectedPost
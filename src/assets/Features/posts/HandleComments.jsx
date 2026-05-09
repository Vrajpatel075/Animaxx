import React, { useEffect, useState } from 'react'
import './HandleComments.css'
import SignInCheak from '../../Component/SignInCheak';
import CommentsService from '../../../Service/CommentsService';
import { FaAngleUp, FaChevronDown, FaRegComment } from 'react-icons/fa'
import { LuMessageSquareReply } from 'react-icons/lu';
import { AiOutlineSend } from 'react-icons/ai';
import { BiHeart } from 'react-icons/bi';
import { MdReportGmailerrorred } from 'react-icons/md';
import { useSelector } from 'react-redux';

function HandleComments({ postId, setIsCommentsOpen, isCommentsOpen,viewComments , setviewComments }) {
  const [comment , setComment] = useState("");
  const [allcomments , setAllComments] = useState([]);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const currMode = useSelector((state)=> state.theme.mode);
  const {userId } = useSelector((state)=>state.auth);

  function timeago(dataString){
    const now = new Date();
    const past = new Date(dataString);
    const diff = Math.floor((now - past) / 1000);

    if(diff < 60 ) return `${diff}sec ago`;
    if(diff < 3600 ) return `${Math.floor(diff/60)} m ago `;
    if(diff < 86400 ) return `${Math.floor(diff/3600)} hour ago `;
    if(diff < 2592000 ) return `${Math.floor(diff/86400)} day ago `;
    return `${Math.floor(diff/ 2592000)} month ago`;
  }

  useEffect(()=>{
    if(postId){
      CommentsService.getallCommentsbyPostId(postId)
        .then(res => setAllComments(res))
        .catch(err=> console.error(err));
    }
  },[postId]);

  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    if(!userId)  {
      setShowSignInModal(true);
      return;
    }
    try{
      await CommentsService.AddComment({
        text : comment,
        user : {userId:userId},
        post : {postId:postId}
      });
      setComment("");
    }catch(err){
      console.error(err);
    }
  };

  return (
    
    <div className={`commentcontainer ${isCommentsOpen ? "open" : ""}`} 
    onClick={() => setIsCommentsOpen(false)}>
      
      <div className={`PostComments ${currMode === "light" ? "light" :"night"}`}
      onClick={(e) => e.stopPropagation()}>
      

    {isCommentsOpen&& (
      <div>
      <div className="line"></div>
        <div className="comments">
          <h2>comments</h2>

          <span onClick={() => setviewComments(prev => !prev)}>
            {viewComments ? <FaAngleUp/> : <FaChevronDown/>}
          </span>
        </div>
        

        <form className="CommentInput" onSubmit={handleSubmit}>
          <span><FaRegComment/> </span>
          <input 
            type="text" 
            required
            placeholder='Comment' 
            value={comment}
            className={`${currMode === "light" ? "light" : "dark"}`} 
            onChange={(e)=> setComment(e.target.value)}
          />
          <button type="submit" className={`CommentPostBtn ${currMode === "light" ? "light" :"night"}`}>
            <AiOutlineSend/>            
          </button>
        </form> </div>)}
                
        {viewComments && isCommentsOpen && (
          <div className="allComments">
            {allcomments.map(c=>(
              <div key={c.commentId} className="sigleComment">
                <div className="commentHeader">
                  <div className='commentProfilPic'>
                    <img src={c.user.profilePicture 
                      ? `http://localhost:8080/uploads/profile-pics/${c.user.profilePicture}` 
                      : '/animax-img/animaxx_default_user_profile_picture.png'} alt="" />
                  </div>
                  <div className="Commentcontent">
                    <h4>{c.user.username}</h4> 
                    <span>{timeago(c.createdAt)}</span>
                  </div>
                </div>
                    <p>{c.text}</p>
                <div className='CommentActivity'>
                  <span><BiHeart/></span>
                  <span><LuMessageSquareReply /></span>
                  <span><MdReportGmailerrorred /></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showSignInModal && <SignInCheak/>}
      </div>
    </div>
  );
}

export default HandleComments;

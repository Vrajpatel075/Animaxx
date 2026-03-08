import React, { useEffect, useState } from 'react'
import '../cssBlocks/HandleComments.css'
import { FaAngleUp, FaChevronDown, FaRegComment } from 'react-icons/fa'
import CommentsService from '../../Service/CommentsService';

function Comments({currMode,postId}) {
     const [viewComments , setviewComments] = useState(false);
     const [comment , setComment] =  useState("");
     const [allcomments , setAllComments] =  useState([]);

     useEffect(()=>{
        if(postId){
            CommentsService.getallCommentsbyPostId(postId)
            .then(res =>{
                setAllComments(res);
                console.log(res)
            }).catch(err=> console.error(err))
        }
     },[postId])


     const handleSubmit = async (e)=>{
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        try{
            const res = await CommentsService.AddComment({
                text : comment,
                user : {userId:userId},
                post : {postId:postId}
            });
            console.log(comment + " " + postId + " " + userId)
            setComment("")
        }catch(err){
            console.error(err);
        }
     }

  return (
    <div>
        <div className={`PostComments ${currMode === "light" ? "light" :"night"}`}>
            <div className="comments">
                <h2>comments</h2>
                <span
                onClick={() => setviewComments(prev => !prev)}>
                {viewComments  ?<FaAngleUp/> : <FaChevronDown/>}
                </span>
            </div>

            <form className="CommentInput" onSubmit={handleSubmit}>
                <span><FaRegComment/> </span>
                <input type="text" 
                placeholder='Comment' 
                value={comment}
                className={`${currMode === "light" ? "light" : "dark"}`} 
                onChange={(e)=> setComment(e.target.value)}/>
                 <button type="submit">Post</button>
            </form>
                
            {viewComments && (
                    <div className="allComments">
                        {allcomments.map(c=>(
                        <div key={c.commentId} className="sigleComment">
                            <div className='PostOwner'>
                                <div className='commentProfilPic'>
                                    <img src={c.user.profilePicture} alt="" />
                                </div>
                                <h5>{c.user.username}</h5>
                            </div>
                            <p>{c.text}</p>
                        </div>
                        ))}
                    </div>
            )}
                
        </div>
    </div>
  )
}

export default Comments
import React, { useEffect, useState } from 'react'
import CommentsService from '../../../../Service/CommentsService';
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdDelete, MdReportGmailerrorred } from 'react-icons/md';
import PostService from '../../../../Service/PostService';
import SelectedUserPost from '../../posts/SelectedUserPost';
import ExitWarring from '../../../Component/ExitWarring';
import CommentSkeleton from '../../../LodingSkeleton/CommentSkeleton';

function CommentedPost({handleBack}) {
    const { userId } = useSelector((state) => state.auth);
    const currMode = useSelector((state)=> state.theme.mode);

    const [userComments, setUserComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPostId , setSelectedPostId] = useState(null);
    const [selectedPost , setSelectedPost] = useState(null);

    const [selectedCommentId,setSelectedCommentId] = useState();
    const [WarringModel , setWarringModel] = useState();

    function timeago(dataString){
        const now = new Date;
        const past = new Date(dataString);
        const diff = Math.floor((now - past) / 1000);

        if(diff < 60 ) return `${diff}sec ago`;
        if(diff < 3600 ) return `${Math.floor(diff/60)} m ago `;
        if(diff < 86400 ) return `${Math.floor(diff/3600)} hour ago `;
        if(diff < 2592000 ) return `${Math.floor(diff/86400)} day ago `;
        return `${Math.floor(diff/ 2592000)} month ago`;
     }
     
     const handleViewPost = async (postId) => {
        try {
            const post = await PostService.getPostByPostId(postId);
            setSelectedPost(post);
            setSelectedPostId(postId)
        } catch (err) {
            console.error("Error fetching post:", err);
        }
    };

      useEffect(() => {
        const GetComments = async () => {
          try {
            setLoading(true);
            const comments = await CommentsService.getUserComments(userId);
            setUserComments(comments);
          } catch (err) {
            console.error(err);
            console.log("Comments not found");
          } finally {
            setLoading(false);
          }
        };
    
        if (userId) {
          GetComments();
        }
      }, [userId]);

    if (loading) {
        return <CommentSkeleton/>;
    }

  return (
        <div className={`CommentContainer ${currMode === "light" ? "light" : "dark"} userInfoContainer`}>
            
            <div className="BackHeader">
                <button
                className={`backButton ${currMode === "light" ? "light" : "dark"}`}
                onClick={handleBack}>
                 <FaArrowLeft />
                </button>
                 <h1>Liked Post</h1>
            </div>
            
            <div className='PostContainer'>
               <div className="allComments">
                    {userComments.length > 0 ? (
                        userComments.map((c) => (
                        <div key={c.commentId} className="sigleComment">
                            <div className="commentHeader mouseCursor"  onClick={() => handleViewPost(c.postId)}>
                                <div className='commentProfilPic'>
                                    <img src={c.profilePicture 
                                    ? `http://localhost:8080/uploads/profile-pics/${c.profilePicture}` 
                                    : '/animax-img/animaxx_default_user_profile_picture.png'} alt="" />
                                </div>
                                <div className="Commentcontent">
                                    <h4>{c.username}</h4> 
                                    <span>{timeago(c.createdAt)}</span>
                                </div>
                            </div>
                            <div className='CommentAndAction'>
                                <p>{c.text}</p>
                                <span className='delete mouseCursor' 
                                onClick={()=> {
                                    setWarringModel("DeleteComment");
                                    setSelectedCommentId(c.commentId);}}><MdDelete/>
                                </span>
                            </div>
                        </div>                          
                        ))
                    ) : (
                    <h2>No Comment posts yet</h2>
                    )}
                </div>
            </div>

    {selectedPostId && <SelectedUserPost
    postId={selectedPostId} 
    posts={[selectedPost]}
    setSelectedPostId={setSelectedPostId}
    closeModal={() => { 
        setSelectedPost(null);
        setSelectedPostId(null);}}
        />}
        
    {WarringModel === "DeleteComment" && (
        <ExitWarring
        WarringModel={WarringModel}
        closeModal={() => setWarringModel(null)}
        onCancel={() => setWarringModel(null)}
        commentId={selectedCommentId}
        onDeleteSuccess={(deletedId) => {
            setUserComments(prev => prev.filter(c => c.commentId !== deletedId));
        }}/>
    )}
    </div>
  )
}

export default CommentedPost
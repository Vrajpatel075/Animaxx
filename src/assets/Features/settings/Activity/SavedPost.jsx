import React, { useEffect, useState } from 'react'
import SkeletonCard from '../../../LodingSkeleton/SkeletonCard';
import { useSelector } from 'react-redux';
import SavepostService from '../../../../Service/SavepostService';
import { FaArrowLeft } from 'react-icons/fa6';
import PostCard from '../../posts/PostCard';
import SelectedUserPost from '../../posts/SelectedUserPost';

function SavedPost({handleBack}) {
     const { userId } = useSelector((state) => state.auth);
     const currMode = useSelector((state)=> state.theme.mode);

    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPostId , setSelectedPostId] = useState(null);
     
       useEffect(() => {
         const GetSavedPost = async () => {
           try {
             setLoading(true);
             const saved = await SavepostService.getSavedPosts(userId);
            setSavedPosts(saved.map(item => item.post));
            
           } catch (err) {
             console.error(err);
             console.log("No saved posts not found");
           } finally {
             setLoading(false);
           }
         };
     
         if (userId) {
           GetSavedPost();
         }
       }, [userId]);
     
       if (loading) {
         return <SkeletonCard />;
       }

  return (
    <div className={`SavedContainer ${currMode === "light" ? "light" : "dark"} userInfoContainer`}>
    <div className="BackHeader">
        <button
        className={`backButton ${currMode === "light" ? "light" : "dark"}`}
        onClick={handleBack}>
            <FaArrowLeft />
        </button>
        <h1>Saved Post</h1>
    </div>

    <div className='PostContainer'>
        <div className="post-list">
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <PostCard
          key={post.postId} 
          post={post}
          onClick={()=> setSelectedPostId(post.postId)} />
        ))
      ) : (
        <h2>No Saved posts yet</h2>
      )}
      </div>
    </div>

    {selectedPostId && <SelectedUserPost
    postId={selectedPostId} 
    posts={savedPosts}
    setSelectedPostId={setSelectedPostId}
    closeModal={() => setSelectedPostId(null)}/>}
    </div>

  )
}

export default SavedPost
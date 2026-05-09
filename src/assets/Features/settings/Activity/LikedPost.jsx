import React, { useEffect, useState } from 'react'
import SkeletonCard from "../../../LodingSkeleton/SkeletonCard"

import LikesService from '../../../../Service/LikesService'

import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa6';

import PostCard from '../../posts/PostCard';
import SelectedUserPost from '../../posts/SelectedUserPost';

function LikedPost({handleBack}) {
  const { userId } = useSelector((state) => state.auth);
  const currMode = useSelector((state)=> state.theme.mode);

  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPostId , setSelectedPostId] = useState(null);

  useEffect(() => {
    const GetLikedPost = async () => {
      try {
        setLoading(true);
        const likes = await LikesService.getUserLikedPosts(userId);
        setLikedPosts(likes);
      } catch (err) {
        console.error(err);
        console.log("Liked posts not found");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      GetLikedPost();
    }
  }, [userId]);

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <>
    <div className={`likeContainer ${currMode === "light" ? "light" : "dark"} userInfoContainer`}>
    <div className="BackHeader">
        <button
        className={`backButton ${currMode === "light" ? "light" : "dark"}`}
        onClick={handleBack}>
            <FaArrowLeft />
        </button>
        <h1>Liked Post</h1>
    </div>

    <div className='PostContainer'>
        <div className="post-list">
      {likedPosts.length > 0 ? (
        likedPosts.map((post) => (
          <PostCard
          key={post.postId} 
          post={post}
          onClick={()=> setSelectedPostId(post.postId)}  />
        ))
      ) : (
        <h2>No liked posts yet</h2>
      )}
      </div>
    </div>

    {selectedPostId && <SelectedUserPost
    postId={selectedPostId} 
    posts={likedPosts}
    setSelectedPostId={setSelectedPostId}
    closeModal={() => setSelectedPostId(null)}/>}
    </div>
  </>
  );
}

export default LikedPost;

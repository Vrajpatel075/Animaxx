import React, { useEffect, useState } from 'react';
import './GalleryPg.css';
import PostCard from '../../Features/posts/PostCard';
import PostService from '../../../Service/PostService';
import Pagination from '../../Component/Pagination';
import UniversalNav from '../../Component/UniversalNav';
import SkeletonCard from '../../LodingSkeleton/SkeletonCard';
import { useSafeNavigate } from '../../../OfflineBackup/useSafeNavigate';
import SideBar from '../../Component/SideBar';

function GalleryPg({ limit, page }) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const [postdata, setPostdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const safeNavigate = useSafeNavigate();

  // fetching the ALLPOST data
  useEffect(() => {
    setLoading(true);
    PostService.getAllPosts()
      .then(res => {
        setPostdata(res);
        setLoading(false);
      })
      .catch(err => {
        if (!navigator.onLine) {
          setPostdata(null);
          setLoading(true)
          }
        })
      }, []);

  // check the userid so post made by active user won't show in gallery
  const activeUserId = Number(localStorage.getItem("userId"));

  // filter posts so active user's posts don't appear in feed
  const filteredPosts = postdata.filter(
    post => post.user.userId !== activeUserId
  );

  // pagination logic
  const lastPostIndex = page * limit;
  const firstPostIndex = lastPostIndex - limit;
  const GalleryPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="AppLayout">      
        <div className="SidebarContainer">
          <SideBar />
        </div> 

        <div className="PostContainer">
        <UniversalNav
        navOpen={wallpaperNavOpen}
        setNavOpen={setWallpaperNavOpen}
        showSearch={true}
        />

        <div className="post-list">
          {loading ? (
            Array.from({ length: limit }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            GalleryPosts.length === 0 && !navigator.onLine ? (
              <p>You are offline. Gallery not available.</p>
            ) : (
              GalleryPosts.map((post) => (
                <PostCard
                  key={post.postId}
                  post={post}
                  onClick={() => safeNavigate(`/ViewedPost/${post.postId}`)}
                />
              ))
            )
          )}
        </div>

        <Pagination
          totalPosts={postdata.length}
          limit={limit}
          page={page}
        />
        </div>
        
      </div>

    </>
  );
}

export default GalleryPg;

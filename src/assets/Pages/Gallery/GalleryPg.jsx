import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './GalleryPg.css';
import PostCard from '../../Features/posts/PostCard';
import PostService from '../../../Service/PostService';
import Pagination from '../../Component/Pagination';
import UniversalNav from '../../Component/UniversalNav';
import FooterPannel from '../../Component/FooterPannel';
import SkeletonCard from '../../LodingSkeleton/Skeleton/SkeletonCard';


function GalleryPg({limit , page }) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const [postdata , setPostdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate   = useNavigate();

  // fetching the ALLPOST data 
  useEffect(()=>{
    setLoading(true)
    PostService.getAllPosts().then(res=>{
      setPostdata(res);
      setLoading(false);
    })
  },[])
  
   // cheak the userid so post made the active usre wont show in gallery  
  const activeUserId = Number(localStorage.getItem("userId"));

  // filtering the ALLPOST so it dont have active user post in feed 
  const filteredPosts = postdata.filter(
    post => post.user.userId !== activeUserId
  ); 


  // the ammount the post per page 
  const lastPostIndex = page * limit;
  const firstPostIndex = lastPostIndex - limit;
  const GalleryPosts = filteredPosts.slice(firstPostIndex , lastPostIndex)

  return (
    <>
      <UniversalNav
        navOpen={wallpaperNavOpen}
        setNavOpen={setWallpaperNavOpen}
        showSearch={true}
      />

      <div className="GalleryPostContainer">
        <div className="post-list">
          {loading ? (
            Array.from({length:limit}).map((_,index)=>(
              <SkeletonCard  key={index}/>
            ))
          ): 
          (GalleryPosts.map((post) => (
            <PostCard
            key={post.postId} 
            post={post} 
            onClick={() => navigate(`/ViewedPost/${post.postId}`)}/>
          )))}
        </div>

        <Pagination
          totalPosts={postdata.length}
          limit={limit}
          page={page}
        />
      </div>

      <FooterPannel />
    </>
  );
}

export default GalleryPg;

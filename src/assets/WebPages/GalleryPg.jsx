import React, { useEffect, useState } from 'react';
import FooterPannel from '../ComponentBlockUi/FooterPannel';
import '../WebPagesCss/GalleryPg.css';
import {useNavigate } from 'react-router-dom';
import Pagination from '../ComponentBlockUi/Pagination';
import UniversalNav from '../ComponentBlockUi/UniversalNav';
import PostService from '../../Service/PostService';
import PostCard from '../ComponentBlockUi/PostCard';
import { useSelector } from 'react-redux';
import SkeletonCard from '../LodingSkeleton/SkeletonUi/SkeletonCard';


// setIsLoggedIn is goint to pass in UniversalNav
function GalleryPg({limit , page ,setIsLoggedIn}) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const [wordLimit , setWordLimit] = useState(5);
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
        setIsLoggedIn={setIsLoggedIn}
        setNavOpen={setWallpaperNavOpen}
        showSearch={true}
      />

      <div className="wallpaper-container">
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

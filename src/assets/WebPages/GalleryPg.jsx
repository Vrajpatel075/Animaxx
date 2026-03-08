import React, { useEffect, useState } from 'react';
import FooterPannel from '../htmlBlocks/FooterPannel';
import '../WebPagesCss/GalleryPg.css';
import {useNavigate } from 'react-router-dom';
import Pagination from '../htmlBlocks/Pagination';
import UniversalNav from '../htmlBlocks/UniversalNav';
import PostService from '../../Service/PostService';
import PostCard from '../htmlBlocks/PostCard';


// setIsLoggedIn is goint to pass in UniversalNav
function GalleryPg({limit , page , currMode ,setIsLoggedIn}) {
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
        currMode={currMode}
        showSearch={true}
      />


      <div className="wallpaper-container">
        <div className="wallpaper-list">
          {loading && <p>Loading...</p>}
          {GalleryPosts.map((post) => (
            <PostCard
            key={post.postId} 
            post={post} 
            currMode={currMode} 
            onClick={() => navigate(`/ViewedPost/${post.postId}`)}/>
          ))}
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

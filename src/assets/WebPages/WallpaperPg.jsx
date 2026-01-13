import React, { useEffect, useState } from 'react'
import FooterPannel from '../htmlBlocks/FooterPannel'
import "../WebPagesCss/WallpaperPg.css"
import NavigationPannel from '../htmlBlocks/NavigationPannel'
import { useNavigate } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import Pagination from '../htmlBlocks/Pagination'


function WallpaperPg(props) {

   const NavigateToHome = useNavigate()
   const [posts,setPosts]=useState([])


   function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";}


  return (
    <>
        <div className="wallpaper-container">
        <div className="SearchAndNavPannel wallpaper-nav">
            <div className='Animaxx-logo'>
                <img src="/animax img source/ANIMAX_LOGO.png" 
                alt="logo" 
                onClick={()=>{NavigateToHome("/")}}/>
            </div>
            
            <div className="responsive_nav_searh">
                <input className="search_input" type="text" placeholder="Search..."/>
                <div className="search_icon">
                <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
             <NavigationPannel />
        </div>


        <div className="wallpaper-list">
        {props.postdata.map(post=>(
            <div className='postCard' key={post.postId}>
                <p>post id : {post.postId}</p>
                <p>user id : {post.userId}</p>
                <img src={post.imageUrl} alt={`post ${post.postId}`}/>
                <h4 className='postTitle'>{post.postOwner}</h4>
                <p className='postDiscription'>{truncateText(post.description,5)}</p>
                
                {/* <div className="postActivite">
                    <span className='postLike'><span><FaRegHeart/></span>{post.likes}</span>
                    <span className='postShare'><FaShare/> {post.shares}</span>
                </div> */}
                </div>
        ))}
        </div>
    <Pagination totalPosts={props.totalPosts} limit={props.limit} setPage={props.setPage} page={props.page}/>

      
    </div>


    <FooterPannel/>
    </>

    
)
}

export default WallpaperPg
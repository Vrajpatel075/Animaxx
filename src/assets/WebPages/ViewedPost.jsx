import React, { useState } from 'react'
import UniversalNav from '../htmlBlocks/UniversalNav'
import { useParams } from 'react-router-dom';
import "../WebPagesCss/ViewedPost.css"
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

function ViewedPost({postdata , currMode }) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const { postId } = useParams(); 
    const [wordLimit , setWordLimit] = useState(15);
  const post = postdata.find(p => p.postId === parseInt(postId));

  if (!post) return <p>Post not found</p>;

  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + ' ...';
  }
  
  return (
    <>
    <UniversalNav
    navOpen={wallpaperNavOpen}
    setNavOpen={setWallpaperNavOpen}
    currMode={currMode}/>

<div className="ViewPostContainer">
    <div className='SelectedPostContainer'>
      <div className="ViewedImg">
        <img src={post.imageUrl} alt={post.postOwner} />
      </div>
      <div className="PostAuther">
         <h2>{post.postOwner}</h2 >
         <p className="postDescription">
          {truncateText(post.description, wordLimit)}
          </p>
      </div>
         <div className='PostActivite'>
          <span><span className='icons'><FaRegHeart/></span>{post.likes}</span>
          <span><span className='icons'><FaShare/></span></span>
         </div>
    </div>
</div>
    </>
  )
}

export default ViewedPost
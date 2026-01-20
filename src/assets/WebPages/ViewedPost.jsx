import React, { useState } from 'react'
import UniversalNav from '../htmlBlocks/UniversalNav'
import { useNavigate, useParams } from 'react-router-dom';
import "../WebPagesCss/ViewedPost.css"
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import "../WebPagesCss/WallpaperPg.css"
import FooterPannel from '../htmlBlocks/FooterPannel';

function ViewedPost({postdata , currMode }) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const { postId } = useParams(); 
  const [wordLimit , setWordLimit] = useState(5);
  const navigate   = useNavigate();

  // to fetch the selected post  data
  const post = postdata.find(p => p.postId === parseInt(postId));

  // to fetch the recomende post accept the selected post
  const recommendedPosts = postdata.filter(p => p.postId !== parseInt(postId));

  const mainSectionsuggestion = 35;
  const sideSectionsuggestion = 25;

  function getRandomSuggestions(start,count){
    return [...recommendedPosts]
    .sort(() => Math.random() - 0.5)
    .slice(start, count);
  }


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

      <div className="mainSection">
       
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

       <section >
      <div className="recomendedPost">
        {getRandomSuggestions(0,mainSectionsuggestion).map(rp=>(
          <div 
          className='postCard'
          key={rp.postId}>
            <img src={rp.imageUrl} 
            alt={rp.postOwner} 
            className={currMode === 'light' ? 'day' : 'night'}
            onClick={()=> navigate(`/ViewedPost/${rp.postId}`)} 
            />
            <h4 className="postTitle">{rp.postOwner}</h4>
              <p className="postDescription">
                {truncateText(rp.description, wordLimit)}
              </p>
              </div>
            ))}
            </div>
      </section>


      </div>

      <div className="sideSection">
       <section>
        <div className="recomendedPost">
          {getRandomSuggestions(0,sideSectionsuggestion).map(rp=>(
            <div 
          className='postCard'
          key={rp.postId}>
            <img src={rp.imageUrl} 
            alt={rp.postOwner} 
            className={currMode === 'light' ? 'day' : 'night'}
            onClick={()=> navigate(`/ViewedPost/${rp.postId}`)} 
            />
            <h4 className="postTitle">{rp.postOwner}</h4>
              <p className="postDescription">
                {truncateText(rp.description, wordLimit)}
              </p>
              </div>
          ))}
        </div>
       </section>
      </div>
    
    
    </div>



    <FooterPannel/>
    </>
  )
}

export default ViewedPost
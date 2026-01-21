import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UniversalNav from '../htmlBlocks/UniversalNav'
import FooterPannel from '../htmlBlocks/FooterPannel';
import "../WebPagesCss/ViewedPost.css"
import "../WebPagesCss/WallpaperPg.css"
import { FaRegHeart ,FaShare,FaArrowLeft,FaChevronDown,FaAngleUp} from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegComment } from "react-icons/fa6";




function ViewedPost({postdata , currMode }) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const { postId } = useParams(); 
  const [wordLimit , setWordLimit] = useState(5);
  const navigate   = useNavigate();
  const [isLargeView , setIsLargeView] = useState(false);
  const [viewComments , setviewComments] = useState(false)
  const [resizeRecomendationValue , setResizeRecomendationValue] = useState(35);

  // to cheak the width on mobile screen and show recomendation accouding to it
  useEffect(()=>{
    function handleResize(){
      if(window.innerWidth<=970){
        setResizeRecomendationValue(50)
      } else{
        setResizeRecomendationValue(35)
      }
    }
    window.addEventListener("resize",handleResize);
    handleResize();
    return ()=> window.removeEventListener("resize",handleResize)
  },[]);

  // to fetch the selected post  data
  const post = useMemo(()=>{
    return postdata.find(p => p.postId === parseInt(postId));
  },[postId,postdata]) 

  // to fetch the recomende post accept the selected post
  const recommendedPosts = useMemo(()=>{
    return postdata.filter(p => p.postId !== parseInt(postId));
  },[postId,postdata]) 

  if (!post) return <p>Post not found</p>;

  // post recomendation
  const mainSectionsuggestion = resizeRecomendationValue;
  const sideSectionsuggestion = 25;

  const mainRecommendations  = useMemo(()=>{
    return [...recommendedPosts].sort(()=> Math.random() - 0.5)
    .slice(0,mainSectionsuggestion);
  },[recommendedPosts,postId])

  const sideRecommendations = useMemo(()=>{
    return [...recommendedPosts].sort(()=>Math.random() - 0.5)
    .slice(0,sideSectionsuggestion);
  },[recommendedPosts,postId])

// download button
  function handleDownload(){
    const link =document.createElement("a");
    link.href = post.imageUrl;
    link.download = `${post.postOwner}.jpg`
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  }

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
        <button 
        className={`backButton ${currMode === 'light' ? 'day' : 'night'}`} 
        onClick={()=>navigate("/WallpaperPg")}>
          <FaArrowLeft/>
        </button>
       
       
       <div className={`SelectedPostContainer ${currMode === 'light' ? 'day' : 'night'}`}>
        
        <div className="Topbuttons">
          <button className='zoomIn' onClick={() => setIsLargeView(true)}><MdOutlineZoomOutMap/></button>
          <button>Save</button>
        </div>
        
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
            <span className='mainicons'>
              <span className='icons'><FaRegHeart/>
              <span className='ActiveCount'>{post.likes}</span>
              </span>
              <span className='icons' onClick={handleDownload}><FiDownload/></span>
              <span className='icons'><HiDotsHorizontal/></span>
            </span>
            <span className='icons'><FaShare/></span>
        </div>

        <div className="PostComments">
          <div className="comments">
            <h2>comments</h2>
            <span className='openComments'
            onClick={() => setviewComments(prev => !prev)}>
              {viewComments  ?<FaAngleUp/> : <FaChevronDown/>}
              </span>
          </div>

          <div className="CommentInput">
            <span><FaRegComment/> </span>
            <input type="text" placeholder='Comment' />
          </div>

          {viewComments && (
           <div className="allComments">
            <div className="sigleComment">
              <h4>Lorem, ipsum dolor.</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="sigleComment">
              <h4>Lorem, ipsum dolor.</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="sigleComment">
              <h4>Lorem, ipsum dolor.</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        )}
        </div>
      </div>

       <section >
      <div className="recomendedPost">
        {mainRecommendations.map(rp=>(
          <div 
          className='postCard'
          key={`main-${rp.postId}`}>
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
          {sideRecommendations.map(rp=>(
            <div 
            className='postCard'
            key={`side-${rp.postId}`}>
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

    {isLargeView && (
      <div className="LargeViewOverlay" onClick={() => setIsLargeView(false)}>
        <div className="LargeViewContent" onClick={(e) => e.stopPropagation()}>
          <img src={post.imageUrl} alt={post.postOwner} className="LargeImage"/>
          <button className="ExitBtn" onClick={() => setIsLargeView(false)}>✕</button>
        </div>
      </div>
        )}

        


    <FooterPannel/>
    </>
  )
}

export default ViewedPost
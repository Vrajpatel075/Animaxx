import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UniversalNav from '../ComponentBlockUi/UniversalNav'
import FooterPannel from '../ComponentBlockUi/FooterPannel';
import "../WebPagesCss/ViewedPost.css"
import "../WebPagesCss/GalleryPg.css"
import { FaArrowLeft} from "react-icons/fa";
import PostService from '../../Service/PostService';
import PostCard from '../ComponentBlockUi/PostCard';
import SelectedPost from '../ComponentBlockUi/SelectedPost';
import { useSelector } from 'react-redux';




function ViewedPost() {
  const navigate   = useNavigate();
  const { postId } = useParams(); 
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); 
  const [selectedpost , setSelectedpostPost] = useState(null);
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const [isLargeView , setIsLargeView] = useState(false);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [resizeRecomendationValue , setResizeRecomendationValue] = useState(35);
  const [mobileRecomendation , setmMbileRecomendation] = useState(false);

  const currMode = useSelector((state)=> state.theme.mode);

  

  // to fetch selected img 
  useEffect(()=>{
    PostService.getPostByPostId(postId).then(res=>{
      setSelectedpostPost(res)
    })
  },[postId])

  const post = selectedpost;

  // to fetch all the img
  useEffect(()=>{
    PostService.getAllPosts().then(res =>{
      setRecommendedPosts(res.filter(p=>p.postId !== parseInt(postId)));
      setIsDescriptionOpen(false);
    })
  },[postId])

  // to cheak the width on mobile screen and show recomendation accouding to it
  useEffect(()=>{
    function handleResize(){
      if(window.innerWidth<=970){
        setResizeRecomendationValue(50)
      } else{
        setResizeRecomendationValue(35)
      }
      if(window.innerWidth<=500){
        setmMbileRecomendation(true)
      }
      else{
        setmMbileRecomendation(false)
      }
    }
    window.addEventListener("resize",handleResize);
    handleResize();
    return ()=> window.removeEventListener("resize",handleResize)
  },[]);

  // post recomendation
  const mainSuggestion = resizeRecomendationValue;
  
  const { mainRecommendations, sideRecommendations } = useMemo(() => {
  const shuffled = [...recommendedPosts].sort(() => Math.random() - 0.5);

  const main = shuffled.slice(0, resizeRecomendationValue); 
  const side = shuffled.slice(resizeRecomendationValue, resizeRecomendationValue + 25); 

  return { mainRecommendations: main, sideRecommendations: side };
}, [recommendedPosts, resizeRecomendationValue]);

  if (!post) return <p>Loading post...</p>;

  return (
    <>
    <div className="viewpage">    

    <div className="ViewPostContainer">

      <div className='PostHeader'>
        <button className={`backButton ${currMode === 'light' ? 'light' : 'dark'}`}
        onClick={()=>navigate(-1)}>
          <FaArrowLeft/>
        </button>
        <h2>Posts</h2>
      </div>
     

      <div className="mainSection">
      <SelectedPost
      post={post}
      setIsDescriptionOpen={setIsDescriptionOpen}
      isDescriptionOpen={isDescriptionOpen}
      /> 
      <section >
        
        
        <div className="recomendedPost">
        {mobileRecomendation || mainRecommendations.map(rp => ( 
          <PostCard
          key={rp.postId} 
          post={rp} 
          onClick={() =>{ 
            navigate(`/ViewedPost/${rp.postId}`)}} />
        ))}

        {mobileRecomendation &&
        mainRecommendations.map(rp =>(
          <SelectedPost 
          key={rp.postId}
          post={rp}/>
        ))}
        </div>
      </section>


      </div>

      <div className="sideSection">
       <section>

        <div className="recomendedPost">
         {sideRecommendations.map(rp => ( 
          <PostCard
          key={rp.postId} 
          post={rp} 
          onClick={() => {
            navigate(`/ViewedPost/${rp.postId}`)}} />
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

      
        </div>
    </>
  )
}

export default ViewedPost
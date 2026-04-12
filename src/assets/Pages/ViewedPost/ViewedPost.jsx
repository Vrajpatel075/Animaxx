import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./ViewedPost.css"
// import "./GalleryPg.css"
import PostCard from '../../Features/posts/PostCard';
import PostService from '../../../Service/PostService';
import SelectedPost from '../../Features/posts/SelectedPost';
import SkeletonCard from '../../LodingSkeleton/Skeleton/SkeletonCard';
import { useSelector } from 'react-redux';
import { FaArrowLeft} from "react-icons/fa";




function ViewedPost() {
  const navigate   = useNavigate();
  const { postId } = useParams(); 
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); 
  const [selectedpost , setSelectedpost] = useState(null);
  const [isLargeView , setIsLargeView] = useState(false);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [resizeRecomendationValue , setResizeRecomendationValue] = useState(35);
  const [mobileRecomendation , setmMbileRecomendation] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const currMode = useSelector((state)=> state.theme.mode);

  

  // to fetch selected img 
  useEffect(()=>{
    PostService.getPostByPostId(postId).then(res=>{
      setSelectedpost(res)
    })
  },[postId])

  const post = selectedpost;

  // to fetch all the img
  useEffect(()=>{
    setLoading(true);
    PostService.getAllPosts().then(res =>{
      setRecommendedPosts(res.filter(p=>p.postId !== parseInt(postId)));
      setLoading(false);
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

  
  const { mainRecommendations, sideRecommendations } = useMemo(() => {
  const shuffled = [...recommendedPosts].sort(() => Math.random() - 0.5);

  const main = shuffled.slice(0, resizeRecomendationValue); 
  const side = shuffled.slice(resizeRecomendationValue, resizeRecomendationValue + 25); 

  return { mainRecommendations: main, sideRecommendations: side };
}, [recommendedPosts, resizeRecomendationValue]);

  if (!post) return <p></p>;

  return (
    <>
    <div className="viewpage">   

    <div className="ViewPostContainer">

      <div className={`BackHeader`}>
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
          {loading ? (
            Array.from({ length: resizeRecomendationValue }).map((_, i) => (
              <SkeletonCard key={i}/>
          )) ):(
            <>
            {!mobileRecomendation && mainRecommendations.map(rp => ( 
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
            </>
          )}

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
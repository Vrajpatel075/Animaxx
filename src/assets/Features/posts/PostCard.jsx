import React, { useEffect, useState } from 'react'
import './postCard.css'
import { useSelector } from 'react-redux';

function PostCard({post , onClick }) {
    const [wordLimit , setWordLimit] = useState();
    const [isDescription , setIsDescription] = useState();

    // redux
    const currMode = useSelector((state)=> state.theme.mode);

    useEffect(()=>{
      const handleResize = () =>{
            if(window.innerWidth<=500){
                setIsDescription(true);
                setWordLimit(0)
            }else{
                setIsDescription(false);
                setWordLimit(5);
            }}
      handleResize();
      window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    },[])

    function truncateText(text="", wordLimit) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ');
    }
  return (
    <div className='postCard' onClick={onClick}>
          <img src={post.compressed_image_url} 
          alt={post.postOwner} 
          loading="lazy"
          className={currMode === 'light' ? 'day' : 'night'} 
           />
           <p className="postcardDescription">
                {truncateText(post.description, wordLimit)}
          </p>
    </div>
  )
}

export default PostCard
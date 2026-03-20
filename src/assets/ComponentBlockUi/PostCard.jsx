import React, { useState } from 'react'
import '../ComponentBlockCss/postCard.css'
import { useSelector } from 'react-redux';

function PostCard({post , onClick }) {
    const [wordLimit , setWordLimit] = useState();
    const currMode = useSelector((state)=> state.theme.mode);

    function truncateText(text="", wordLimit=5) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + ' ...';
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
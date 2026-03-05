import React, { useState } from 'react'
import '../cssBlocks/postCard.css'

function PostCard({post , currMode , onClick }) {
    const [wordLimit , setWordLimit] = useState();
    
    function truncateText(text="", wordLimit=5) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + ' ...more';
    }
  return (
    <div className='postCard' onClick={onClick}>
          <img src={post.imageUrl} 
          alt={post.postOwner} 
          className={currMode === 'light' ? 'day' : 'night'} 
           />
           <p className="postcardDescription">
                {truncateText(post.description, wordLimit)}
          </p>
    </div>
  )
}

export default PostCard
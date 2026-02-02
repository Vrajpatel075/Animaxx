import React, { useState } from 'react';
import FooterPannel from '../htmlBlocks/FooterPannel';
import '../WebPagesCss/WallpaperPg.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../htmlBlocks/Pagination';
import UniversalNav from '../htmlBlocks/UniversalNav';


function WallpaperPg(props) {
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);
  const [wordLimit , setWordLimit] = useState(5);
  const navigate   = useNavigate();


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
        currMode={props.currMode}
        showSearch={true}
      />


      <div className="wallpaper-container">
        <div className="wallpaper-list">
          {props.postdata.map((post) => (
            <div className="postCard" key={post.postId}>
              
              <img 
              src={post.imageUrl} 
              alt={`post ${post.postId}`}
              className={props.currMode === 'light' ? 'day' : 'night'}
              onClick={()=> navigate(`/ViewedPost/${post.postId}`)} 
              />
              <h4 className="postTitle">{post.postOwner}</h4>
              <p className="postDescription">
                {truncateText(post.description, wordLimit)}
              </p>
            </div>
          ))}
        </div>

        <button>
          <p>
          <Link to="/UploadPost">Add Poat</Link>
          </p>
        </button>

        <Pagination
          totalPosts={props.totalPosts}
          limit={props.limit}
          setPage={props.setPage}
          page={props.page}
        />
      </div>

      <FooterPannel />
    </>
  );
}

export default WallpaperPg;

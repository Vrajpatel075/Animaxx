import React, { useState } from 'react';
import FooterPannel from '../htmlBlocks/FooterPannel';
import '../WebPagesCss/WallpaperPg.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../htmlBlocks/Pagination';
import UniversalNav from '../htmlBlocks/UniversalNav';

function WallpaperPg(props) {
  const navigateToHome = useNavigate();
  const [wallpaperNavOpen, setWallpaperNavOpen] = useState(false);

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
      />


      <div className="wallpaper-container">
        <div className="wallpaper-list">
          {props.postdata.map((post) => (
            <div className="postCard" key={post.postId}>
              

              <img src={post.imageUrl} alt={`post ${post.postId}`}
              className={props.currMode === 'light' ? 'day' : 'night'}/>
              <h4 className="postTitle">{post.postOwner}</h4>
              <p className="postDiscription">
                {truncateText(post.description, 5)}
              </p>
            </div>
          ))}
        </div>

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

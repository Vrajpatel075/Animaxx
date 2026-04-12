import React, { useEffect, useRef, useState } from 'react'
import { FaRegComment, FaShare } from 'react-icons/fa6';
import { RiShareBoxFill } from 'react-icons/ri';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdBookmarkBorder, MdOutlineDownloading, MdOutlineFileDownload } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "./SelectedPost.css"
import HandleLikes from './HandleLikes';
import HandleComments from './HandleComments';
import CommentsService from '../../../Service/CommentsService';
import { FaBookmark, FaChessQueen } from 'react-icons/fa';
import SavepostService from '../../../Service/SavepostService';

function SelectedPost({post ,setIsDescriptionOpen ,  isDescriptionOpen}) {
    const navigate = useNavigate();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [wordLimit , setWordLimit] = useState();
    const [commentcount , SetCommentCount] = useState();
    const [isSaved, setIsSaved] = useState(false);
      
    // dropdown
    const [isDropdownOpen , setIsDropdownOpen] = useState(false);
    const [isDownloadDropdownOpen , setIsDownloadDropdownOpen ] =  useState(false);
    const dropdownRef = useRef();

    const currMode = useSelector((state)=> state.theme.mode);
    const {userId} = useSelector((state)=>state.auth);

    useEffect(() => {
      const checkSaved = async () => {
        try {
          const saved = await SavepostService.isSaved(userId, post.postId);
          setIsSaved(saved);
        } catch (err) {
          console.error("Error checking saved status", err);
        }
      };
      
      if (post?.postId && userId) {
        checkSaved();
      }
    }, [post.postId, userId]);

    
    const toggleSave = async () => {
      console.log("userid " + userId +"postid" + post.postId);
    if (isSaved) {
      await SavepostService.unsavePost(userId, post.postId);
      setIsSaved(false);
    } else {
      await SavepostService.savePost(userId, post.postId);
      setIsSaved(true);
    }
  };

    function parseDMY(dateStr) {
      const [day, month, year] = dateStr.split("-");
      return new Date(`${year}-${month}-${day}`);
    }

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (!dropdownRef.current?.contains(e.target)) {
          setIsDropdownOpen(false);
          setIsDownloadDropdownOpen(false); 
          }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);




     useEffect(()=>{
        try{
            CommentsService.getCommentCount(post.postId).then(res => {
            SetCommentCount(res)
            })
        }catch(err){
            console.error(err);
        }
     },[post.postId])

  
    function truncateText(text="", wordLimit=5) {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    
    async function downloadImageWithWatermark(url, filename = "image.jpg", watermarkText = "Animaxx") {
      // Fetch the image as a blob
      const response = await fetch(url);
      const blob = await response.blob();
      const img = await createImageBitmap(blob);
      
      // Create a canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Add watermark text
      ctx.font = `${Math.floor(img.width / 20)}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; 
      ctx.textAlign = "right";
      ctx.fillText(watermarkText, img.width - 20, img.height - 20);
      
      // Export canvas to blob
      canvas.toBlob((watermarkedBlob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(watermarkedBlob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, "image/jpeg", 0.7); // 0.7 = lower quality for free users
      }




  return (
    <div>
        <div className={`SelectedPost ${currMode === 'light' ? 'light' : 'night'}`}>
                
        
                <div className='PostOwner'>
                    <div className='ProfilPic'>
                      <img className='' src={`http://localhost:8080/uploads/profile-pics/${post.user?.profilePicture}`}alt={post.user?.username} />
                    </div>
                    <div className="ProfilrUsername mouseCursor"
                    onClick={()=>{
                      navigate(`/ProfilePg/${post.user?.userId}`)
                    }}>
                      <span>{post.user?.username}</span>
                    </div>
                    
                </div>
        
                <div className="ViewedImg">          
                  <img src={post.imageUrl} alt={post.postOwner} loading='lazy' />
                </div>
             
                <div className='PostActivite'>
                    <span className='mainicons'>
                      <HandleLikes post={post}/>
                      <span className='icons'><FaRegComment
                      onClick={() => setIsCommentsOpen(prev => !prev)}/>  
                      <span  className='ActiveCount'>{commentcount}</span> </span>
                      <span className='icons' onClick={toggleSave}> {isSaved ? <FaBookmark /> : <MdBookmarkBorder /> }</span>
                      <span className='icons'><FaShare/></span>
                    </span>
                      <span className='icons' onClick={()=> setIsDropdownOpen(prev => !prev)}><HiDotsHorizontal/></span>
                    
                </div>
                
                <div className="dropdown" ref={dropdownRef}> 
                  <div className={`dropdown-menu 
                  ${ isDropdownOpen ? "active" : "" }
                  ${currMode === "light" ? "light" : "night"}`}>
                    
                    {/* Download */}
                    <p 
                    className='dropdownlink mouseCursor'
                    onClick={()=> setIsDownloadDropdownOpen(prev => !prev)}>
                    <span><MdOutlineFileDownload /></span> 
                    <span>Download</span>
                    </p>
                    {isDownloadDropdownOpen && (
                      <div className={`dropdown-menu 
                         ${isDownloadDropdownOpen ? "active" : ""} 
                         ${currMode === "light" ? "light" : "night"}`}>
                        <p 
                        className='dropdownlink mouseCursor'
                        onClick={() => navigate("/Premium")}>
                          <span><FaChessQueen /></span>
                          <span>Original Hd</span>
                        </p>
                        
                        <p 
                        className='dropdownlink mouseCursor'
                        onClick={() => downloadImageWithWatermark(post.imageUrl, post.title + ".jpg", "Animaxx")}>
                          <span><MdOutlineDownloading /></span>
                          <span>Watermarked</span>
                        </p>

                      </div>
                    )}
                    
                    {/* share */}
                    <p 
                    className='dropdownlink mouseCursor'
                    onClick={()=> navigate("/Settings")}>
                    <span><RiShareBoxFill /></span>
                    <span>Share</span>
                    </p>
                  </div>
                </div>

                <div className="PostAuther">
                  <h3>{post.title}</h3>
                  {isDescriptionOpen ? (
                    <p className='postDescription'>{post.description}
                    </p>
                  ) : (
                     <h3 className="postDescription">
                      {truncateText(post.description, wordLimit)}
                      <span className='mouseCursor' onClick={()=>setIsDescriptionOpen(true)}> ...more </span>
                    </h3> 
                  )}
                  {isDescriptionOpen && (
                      <div className='postDescription'>
                        {post.tags.map((tag,index)=>(
                          <span key={index}>
                            <span>#{tag} </span>
                          </span>
                        ))}
                        <span className='mouseCursor' onClick={()=> setIsDescriptionOpen(false)}> ...Show less</span> 
                      </div>
                    )}
                  <span>{parseDMY(post.createdAt).toLocaleDateString("en-GB",{
                    day:"2-digit",
                    month:"long",
                    year:"numeric"
                  })}</span>
                </div>

                {isCommentsOpen &&
                <HandleComments
                setIsCommentsOpen={setIsCommentsOpen}
                postId={post.postId}
                />}
        
        
              </div>  
    </div>
  )
}

export default SelectedPost
import React from 'react';
import "../WebPagesCss/UploadPost.css"
import UniversalNav from "../htmlBlocks/UniversalNav.jsx";
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function UploadPost(props) {
    const navigate = useNavigate();

    const handleTagsChange = (e) =>{ 
        const value = e.target.value; 
        setTags(value.split(",").map(tag => tag.trim()).filter(tag => tag));
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        console.log("Tags:", tags);
    }
  return (
    <>


    <div className="formContainer">


    <div className='PostForm'>
        <button 
        className={`backButton ${props.currMode === 'light' ? 'day' : 'night'}`} 
        onClick={()=>navigate("/WallpaperPg")}>
            <FaArrowLeft/>
        </button>
         <h1>Upload Post</h1>
         <form 
         method='post'
         encType="multipart/form-data" 
         onChange={handleSubmit}
         >
             <label htmlFor="img">Image:</label>
             <input type="file" accept="image/*" id="img" name="img" />

             <label htmlFor="name">Description.:</label>
             <input type="text" id="name" name="name"/>

             <label htmlFor="tags">Tags:</label>
             <input type="text" id="tags" placeholder="Enter tags separated by commas" onChange={handleTagsChange}/>

            <button type="submit">Upload</button>
         </form>
    </div>
</div>
    </>
  );
}

export default UploadPost;

import React, { useEffect, useRef, useState } from 'react';
import "../ModelCss/UploadPost.css";
import ExitWarring from '../ModelBody/ExitWarring.jsx';
import PostService from '../../Service/PostService.js';
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';

function UploadPost({setCheakDiscard, cheakdiscard ,setUserPosts,setActiveModal }) {
  const postinputref = useRef(null);
  const [post, setPost] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formerror, SetFormError] = useState({});
  const currMode = useSelector((state)=> state.theme.mode);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setTags(value.split(",").map(tag => tag.trim()).filter(tag => tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newformErrors = {};
    if (!post) newformErrors.post = "Select Post";
    if (!title.trim()) newformErrors.title = "Enter Title For Post";
    if (tags.length === 0) newformErrors.tags = "Enter at least 1 Tag";
    SetFormError(newformErrors);

    if (Object.keys(newformErrors).length === 0) {
      try {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        tags.forEach(tag => formdata.append("tags", tag));

        formdata.append("originalImg", originalFile);
        formdata.append("compressedImg", post);

        const currentUserId = localStorage.getItem("userId");
        formdata.append("userId", currentUserId);

        const response = await PostService.createPost(formdata);
        setUserPosts(prev => [...prev, response.data]);
        setActiveModal(null);
        alert("Post uploaded successfully!");
      } catch (error) {
         alert("Error uploading post: " + error.message);
      }
    }
  };

  const handlePostUpload = () => {
    postinputref.current.click();
  };

  const handlePostChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalFile(file);
      try{
         const option = {
        maxSize:0.1,
        maxWidthOrHeight:300,
        useWebWorker:true,
      };
      const compressedFile = await imageCompression(file,option)
      setPost(compressedFile);
       const url = URL.createObjectURL(compressedFile);
      setPreviewUrl(url);
    }catch(err){
      alert("Image compression failed: " + err.message);
    }}
  };

  return (
    <>
      <div className="formContainer" onClick={() => setCheakDiscard(true)}>
        <div
          className={`PostForm ${currMode === "light" ? "light" : "dark"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button triggers ExitWarring */}
          
          <h1 className='Uploadtitle'>Upload Post</h1>
          <h1 className='Close-btn' onClick={() => setCheakDiscard(true)}>X</h1>

          <form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="viewimg" onClick={handlePostUpload}>
              {previewUrl ? (
                <img src={URL.createObjectURL(post)} alt="img" />
              ) : (
                <img src="/animax img source/animaxx_default_user_profile_picture.png" alt="img" />
              )}
              <input
                type="file"
                accept="image/*"
                id="img"
                name="img"
                ref={postinputref}
                style={{ display: "none" }}
                onChange={handlePostChange}
              />
              {formerror.post && <p className='error'>{formerror.post}</p>}
              <p>Image Must be less then 5 Mb</p>
              <button className='mouseCursor' type="button">Select Image</button>
            </div>

            <div className='formInputs'>

            <label>Title :</label>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}
              className={currMode === "light" ? "light" : "dark"} />
            {formerror.title && <p className='error'>{formerror.title}</p>}

            <label>Description :</label>
            <input type="text" name="Description" onChange={(e) => setDescription(e.target.value)}
              className={currMode === "light" ? "light" : "dark"} />
          
            <label>Tags :</label>
            <textarea
              name='tags'
              maxLength={300}
              placeholder="Enter tags separated by commas"
              onChange={handleTagsChange}
              className={currMode === "light" ? "light" : "dark"} />
             {formerror.tags && <p className='error'>{formerror.tags}</p>}

             </div>
             
            <button className='UploadButton mouseCursor' type='submit'>Upload</button>
          </form>
        </div>

        {/* ExitWarring modal */}
        {cheakdiscard && (
          <ExitWarring
          WarringModel={"exitWarring"}
          onCancel={()=> setCheakDiscard(false)} 
          setActiveModal={setActiveModal} 
          />
        )}
      </div>
    </>
  );
}

export default UploadPost;

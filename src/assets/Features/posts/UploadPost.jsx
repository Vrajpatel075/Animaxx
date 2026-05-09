import React, { useEffect, useRef, useState } from 'react';
import { FaFileCircleCheck } from 'react-icons/fa6';

import "./UploadPost.css";
import ExitWarring from '../../Component/ExitWarring.jsx';
import imageCompression from 'browser-image-compression'; 

import toast from 'react-hot-toast';
import PostService from '../../../Service/PostService.js';

import { useSelector } from 'react-redux';

function UploadPost({setCheakDiscard, setActiveModal, cheakdiscard ,setUserPosts,closeModal }) {
  const postinputref = useRef(null);
  const [post, setPost] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formerror, SetFormError] = useState({});
  const [inputValue, setInputValue] = useState("");

  // redux
  const currMode = useSelector((state)=> state.theme.mode);
  const {userId} = useSelector((state)=>state.auth);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setTags(value.split(",").map(tag => tag.trim()).filter(tag => tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newformErrors = {};
    if (!post) newformErrors.post = "Select Post";
    if (!title.trim()) newformErrors.title = "Enter Title For Post";
    if (tags.length === 0) newformErrors.tags = "Enter at least 1 Tag";
    SetFormError(newformErrors);
    if(Object.keys(newformErrors).length !== 0) {
      toast.error("Please FIll the required details" , {  style:{
        background:"#ff9239",
        font:"1rem"
      }})
    }

    if (Object.keys(newformErrors).length === 0) {
      try {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        tags.forEach(tag => formdata.append("tags", tag));

        formdata.append("originalImg", originalFile);
        formdata.append("compressedImg", post);
        formdata.append("userId", userId);

        const response = await PostService.createPost(formdata);
        setUserPosts(prev => [...prev, response.data]);
        setActiveModal(null);
        toast("Post uploaded successfully!" , {icon:<FaFileCircleCheck/> , style: {
          background: "#ff9239",
          font:"1rem"
        }});
      } catch (error) {
         toast.error("Error uploading post: " + error.message);
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
          <h1 className='Close-btn mouseCursor' onClick={() => setCheakDiscard(true)}>X</h1>

          <form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="viewimg" onClick={handlePostUpload}>
              {previewUrl ? (
                <img src={URL.createObjectURL(post)} alt="img" />
              ) : (
                <img src="/animax-img/animaxx_default_user_profile_picture.png" alt="img" />
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
              <button className='mouseCursor UploadButton' type="button">Select Image</button>
            </div>

            <div className='formInputs'>

           
            <input 
            type="text" 
            name="title" 
            onChange={(e) => setTitle(e.target.value)}
            className={currMode === "light" ? "light" : "dark"} 
            placeholder={`${formerror.title ? formerror.title : "Title"} `}/>
            {/* {formerror.title && <p className='error'>{formerror.title}</p>} */}

            
            <input 
            type="text" 
            name="Description" 
            onChange={(e) => setDescription(e.target.value)}
            className={currMode === "light" ? "light" : "dark"}
            placeholder='Discription' />
            
            <div className={`tags-input-container ${currMode}`}>
              {tags.map((tag, index) => (     
                <div className={`tag-item ${currMode=== "light" ? "light" : "night"}`} key={index}>
                  <span>{tag}</span>
                  <button
                  type="button"
                  className="remove-tag"
                  onClick={() => removeTag(index)}>
                    ×
                  </button>
                </div>
              ))}
              
              <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={formerror.tags ? formerror.tags : "Type a tag and press space"}
              className={`tag-input ${formerror.tags ? "error-placeholder" : ""}`}
              />
            </div>

            </div>
             
            <button className='UploadButton mouseCursor' type='submit'>Upload</button>
          </form>
        </div>

        {/* ExitWarring modal */}
        {cheakdiscard && (
          <ExitWarring
          WarringModel={"exitWarring"}
          onCancel={()=> setCheakDiscard(false)} 
          closeModal={closeModal} 
          />
        )}
      </div>
    </>
  );
}

export default UploadPost;

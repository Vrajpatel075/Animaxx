import React, { useRef, useState } from 'react';
import "../ModelCss/UploadPost.css";
import ExitWarring from '../ModelBody/ExitWarring.jsx';
import PostService from '../../Service/PostService.js';

function UploadPost({ currMode, setCheakDiscard, cheakdiscard ,setActiveModal }) {
  const postinputref = useRef(null);
  const [post, setPost] = useState();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formerror, SetFormError] = useState({});

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
        formdata.append("img", post);

        const currentUserId = localStorage.getItem("userId");
        formdata.append("userId", currentUserId);

        await PostService.createPost(formdata);
        alert("Post uploaded successfully!");
      } catch (error) {
        alert(error);
      }
    }
  };

  const handlePostUpload = () => {
    postinputref.current.click();
  };

  const handlePostChange = (e) => {
    const file = e.target.files[0];
    if (file) setPost(file);
  };

  return (
    <>
      <div className="formContainer" onClick={() => setCheakDiscard(true)}>
        <div
          className={`PostForm ${currMode === "light" ? "light" : "dark"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button triggers ExitWarring */}
          <h1 className='Close-btn' onClick={() => setCheakDiscard(true)}>X</h1>

          <h1 className='Uploadtitle'>Upload Post</h1>
          <form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="img">Image :</label>
            <div className="viewimg" onClick={handlePostUpload}>
              {post ? (
                <img src={URL.createObjectURL(post)} alt="img" />
              ) : (
                <img src="/animax img source/animaxx_female_user_profile_picture.png" alt="img" />
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
              <button className='mouseCursor' type="button">Select Image</button>
            </div>

            <label>Title :</label>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}
              className={currMode === "light" ? "light" : "dark"} />
            {formerror.title && <p className='error'>{formerror.title}</p>}

            <label>Description :</label>
            <input type="text" name="Description" onChange={(e) => setDescription(e.target.value)}
              className={currMode === "light" ? "light" : "dark"} />
            {formerror.description && <p className='error'>{formerror.description}</p>}

            <label>Tags :</label>
            <textarea
              name='tags'
              maxLength={50}
              placeholder="Enter tags separated by commas"
              onChange={handleTagsChange}
              className={currMode === "light" ? "light" : "dark"} />

            <button className='UploadButton mouseCursor' type='submit'>Upload</button>
          </form>
        </div>

        {/* ExitWarring modal */}
        {cheakdiscard && (
          <ExitWarring
            currMode={currMode}
            setCheakDiscard={setCheakDiscard}
            setActiveModal={setActiveModal} 
          />
        )}
      </div>
    </>
  );
}

export default UploadPost;

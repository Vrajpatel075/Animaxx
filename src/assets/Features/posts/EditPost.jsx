import React, { useState } from 'react';
import { FaFileCircleCheck } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import PostService from '../../../Service/PostService.js';

import "./UploadPost.css";
import ExitWarring from '../../Component/ExitWarring.jsx';

function EditPost({ postId, title, description, tags, imageUrl, closeModal, setCheakDiscard, cheakdiscard }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags.join(", "));
  const [formerror, SetFormError] = useState({});

  const currMode = useSelector((state) => state.theme.mode);

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setNewTags(value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let newformErrors = {};
    if (!newTitle.trim()) newformErrors.title = "Enter Title For Post";
    if (!newTags.trim()) newformErrors.tags = "Enter at least 1 Tag";
    SetFormError(newformErrors);

    if (Object.keys(newformErrors).length !== 0) {
      toast.error("Please fill the required details", {
        style: { background: "#ff9239", font: "1rem" }
      });
      return;
    }

    try {
      const payload = {
        title: newTitle,
        description: newDescription,
        tags: newTags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };
      await PostService.editPost(postId, payload);
      toast("Post updated successfully!", {
        icon: <FaFileCircleCheck />,
        style: { background: "#ff9239", font: "1rem" }
      });
      closeModal();
    } catch (error) {
      toast.error("Error updating post: " + error.message);
    }
  };

  return (
    <>
      <div className="formContainer" onClick={() => setCheakDiscard(true)}>
        <div
          className={`PostForm ${currMode === "light" ? "light" : "dark"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className='Uploadtitle'>Edit Post</h1>
          <h1 className='Close-btn mouseCursor' onClick={() => setCheakDiscard(true)}>X</h1>

          <form method='post' onSubmit={handleUpdate}>
            <div className="viewimg">
              <img src={imageUrl} alt="post preview" />
              <p>Image cannot be changed once uploaded</p>
            </div>

            <div className='formInputs'>
              <input
                type="text"
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={currMode === "light" ? "light" : "dark"}
                placeholder={`${formerror.title ? formerror.title : "Title"} `}
              />

              <input
                type="text"
                name="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className={currMode === "light" ? "light" : "dark"}
                placeholder="Description"
              />

              <textarea
                name='tags'
                maxLength={300}
                value={newTags}
                onChange={handleTagsChange}
                placeholder={`${formerror.tags ? formerror.tags : "Enter tags separated by commas"} `}
                className={currMode === "light" ? "light" : "dark"}
              />
            </div>

            <button className='UploadButton mouseCursor' type='submit'>Save Changes</button>
          </form>
        </div>

        {cheakdiscard && (
          <ExitWarring
            WarringModel={"exitWarring"}
            onCancel={() => setCheakDiscard(false)}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
}

export default EditPost;

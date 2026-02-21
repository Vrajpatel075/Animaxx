import React from 'react';
import "../cssBlocks/UploadPost.css"
import UniversalNav from "./UniversalNav.jsx";
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useRef , useState } from 'react';
import UserService from '../../Service/UserService.js';
import PostService from '../../Service/PostService.js';

function UploadPost({currMode , setIsAddpostOpen}) {
    const navigate = useNavigate();
    const postinputref = useRef(null);
    const [post , setPost] = useState();
    const [tags , setTags] = useState([]);
    const [title , setTitle] = useState("");
    const [description , setDescription] =  useState("");
    const [formerror , SetFormError] =  useState("");

    const handleTagsChange = (e) =>{ 
        const value = e.target.value; 
        setTags(value.split(",").map(tag => tag.trim()).filter(tag => tag));
    };
    

    const handleSubmit = async (e) => { 
        e.preventDefault(); 

        let newformErrors = {};
        if(!post) newformErrors.post = "Select Post";
        if(!title.trim()) newformErrors.title = "Enter Title For Post";
        if(!tags.length===0) newformErrors.tags = "Enter Atlest 1 Tag";
        SetFormError(newformErrors);

        if(Object.keys(newformErrors).length === 0){ 
        try{
            const formdata = new FormData();
            formdata.append("title" , title);
            formdata.append("description" , description);
            tags.forEach(tag=>formdata.append("tags" , tag));
            formdata.append("img", post);
            
            const currentUserId = localStorage.getItem("userId");
            formdata.append("userId", currentUserId);

            alert("post uploded sucessfully" + title + description + tags  + post)
            const response = await PostService.createPost(formdata)
                setIsAddpostOpen(false)
        }catch(error){
            alert(error)
        }
    }};

    // when user click on img upload img option appear
    const handlePostUpload = ()=>{
        postinputref.current.click();
    }

    const handlePostChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            setPost(file);
        }
    };

  return (
    <>


    <div className="formContainer" onClick={() => setIsAddpostOpen(false)}>


    <div className={`PostForm ${currMode === "light"?"light":"dark"}`} onClick={(e) => e.stopPropagation()}>
         <h1>Upload Post</h1>
         <form 
         method='post'
         encType="multipart/form-data" 
         onSubmit={handleSubmit}
         >
             <label htmlFor="img">Image:</label>
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
                <button type="button">Select Image</button>
            </div>


             <label>Title.:</label>
             <input 
             type="text"
             name="title"
             onChange={(e)=>setTitle(e.target.value)}
             className={`${currMode === "light"  ? "light" : "dark"}`}/>
             {formerror.title && <p className='error'>{formerror.title}</p>}
             
             <label>Description.:</label>
             <input 
             type="text" 
             name="Description"
             onChange={(e)=>setDescription(e.target.value)}
             className={`${currMode === "light"  ? "light" : "dark"}`}/>
             {formerror.description && <p className='error'>{formerror.description}</p>}
             

             <label>Tags:</label>
             <input 
             type="text" 
             name='tags' 
             placeholder="Enter tags separated by commas" 
             onChange={handleTagsChange}
             className={`${currMode === "light"  ? "light" : "dark"}`}/>

            <button type='submit'>Upload</button>
         </form>
    </div>
</div>
    </>
  );
}

export default UploadPost;

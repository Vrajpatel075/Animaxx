import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './assets/WebPages/Home';
import WallpaperPg from './assets/WebPages/WallpaperPg';
import BackToTop from './assets/htmlBlocks/BackToTop';
import SignIn from './assets/WebPages/SignIn';
import SignUp from './assets/WebPages/SignUp';
import { postFeedData } from '../postData';   
import { useEffect, useState } from 'react';
import ViewedPost from './assets/WebPages/ViewedPost';
import UploadPost from './assets/ModelBody/UploadPost';
import ProfilePg from './assets/WebPages/ProfilePg';
import SignUpUserinfo from './assets/WebPages/SignUpUserinfo';
import Settings from './assets/ModelBody/Settings';
import SelectedUserPost from './assets/ModelBody/SelectedUserPost';

function App() {
  // used for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const lastPostIndex = page * limit;
  const firstPostIndex = lastPostIndex - limit;
  

  //cheak if user is login or not for authorization
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId"));
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); 
    setIsLoggedIn(!!storedUserId);
  }, []);

  // slice the data for pagination
  const currentPosts = postFeedData.slice(firstPostIndex, lastPostIndex);


  // toggle light and dark mode
  const [currMode, setCurrMode] = useState(()=>{
    return localStorage.getItem("mode") || "light";
  });
  
    const toggleMode = () => {
      const newMode = currMode === "light" ? "dark" : "light";
      setCurrMode(newMode);
      localStorage.setItem("mode", newMode);
      document.body.classList.remove(currMode);
      document.body.classList.add(newMode);
    };
    useEffect(() => {
      document.body.classList.add(currMode);
    }, [currMode]);


  return (
    <>
      <BrowserRouter>

      {/* back  to top arrow which is on botton right of every page */}
        <BackToTop 
        currMode={currMode}/>
        
        <Routes>

          {/* Chinging them / mode using toggle from home page in bento box 3 */}
          <Route 
          path='/' 
          element={<Home 
          toggleMode={toggleMode}
          currMode={currMode}
          />} />


          <Route 
          path='/WallpaperPg' 
          element={<WallpaperPg 
          postdata={currentPosts} 
          limit={limit} 
          totalPosts={postFeedData.length} 
          page={page}
          setPage={setPage}
          currMode={currMode}
          />} />


          <Route path='/SignIn' element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SignUpUserinfo' element={<SignUpUserinfo />} />
    
          <Route 
          path='/ViewedPost/:postId' 
          element={<ViewedPost 
          postdata={postFeedData} 
          currMode={currMode}
          />} />

          {/* cheak if user is login before navigating to profilePg */}
          <Route
          path='/ProfilePg'
          element={isLoggedIn ? <ProfilePg 
            currMode={currMode} 
            setCurrMode={setCurrMode} 
            setIsLoggedIn={setIsLoggedIn}/>  
            : 
          <Navigate to="/" 
          /> } />

          {/* <Route
          path='/SelectedUserPost/:postId'
          element={<SelectedUserPost
          currMode={currMode}
          /> } /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

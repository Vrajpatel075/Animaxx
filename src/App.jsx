import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './assets/WebPages/Home';
import GalleryPg from './assets/WebPages/GalleryPg'
import BackToTop from './assets/ComponentBlockUi/BackToTop';
import SignIn from './assets/WebPages/SignIn';
import SignUp from './assets/WebPages/SignUp';  
import { useEffect, useState } from 'react';
import ViewedPost from './assets/WebPages/ViewedPost';
import ProfilePg from './assets/WebPages/ProfilePg';
import SignUpUserinfo from './assets/WebPages/SignUpUserinfo';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  // used for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const currMode = useSelector((state) => state.theme.mode);

  //cheak if user is login or not for authorization
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId"));
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); 
    setIsLoggedIn(!!storedUserId);
  }, []);

    useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(currMode);
    }, [currMode]);


  return (
    <>
      <BrowserRouter>

      {/* back  to top arrow which is on botton right of every page */}
        <BackToTop 
        />
        
        <Routes>

          {/* Chinging them / mode using toggle from home page in bento box 3 */}
          <Route 
          path='/' 
          element={<Home 
          />} />


          <Route 
          path='/Gallery' 
          element={<GalleryPg 
          limit={limit} 
          page={page}
          setPage={setPage}
          />} />
    


          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SignUpUserinfo' element={<SignUpUserinfo />} />
    
          <Route 
          path='/ViewedPost/:postId' 
          element={<ViewedPost 
          />} />

          {/* cheak if user is login before navigating to profilePg */}
          <Route
          path='/ProfilePg/:userId'
          element={isLoggedIn ? <ProfilePg />  
            : 
          <Navigate to="/" 
          /> } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

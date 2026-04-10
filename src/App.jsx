import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import "./assets/Style/utilities.css";
import "./assets/Style/variables.css";
import toast from 'react-hot-toast';

// components
import Home from './assets/Pages/Home/Home';
import GalleryPg from './assets/Pages/Gallery/GalleryPg'
import ProfilePg from './assets/Pages/Profile/ProfilePg';
import ViewedPost from './assets/Pages/ViewedPost/ViewedPost';
import SignIn from './assets/Pages/SignIn-Up/SignIn';
import SignUp from './assets/Pages/SignIn-Up/SignUp';  
import SignUpUserinfo from './assets/Pages/SignIn-Up/SignUpUserinfo';

// icons
import { BsSunFill } from 'react-icons/bs';
import { IoMoon } from 'react-icons/io5';

// redux
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Settings from './assets/Features/settings/Settings';
import BackToTop from './assets/Component/BackToTop';

function App() {

  // used for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  
  const currMode = useSelector((state) => state.theme.mode);
  const [prevMode , setPrevMode] = useState(currMode);

  //cheak if user is login or not for authorization
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId"));
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); 
    setIsLoggedIn(!!storedUserId);
  }, []);

    useEffect(() => {

      document.body.classList.remove("light", "dark");
      document.body.classList.add(currMode);
      if(prevMode !== currMode){
        if(currMode ===  "light"){
          toast("Switched to Light theme" , {icon: <BsSunFill/>} );
        }else{
          toast("Switched to Dark theme" , {icon: <IoMoon/> , style:{background:"black", color:"white"}} );
        }
        setPrevMode(currMode)
      }
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

          <Route
          path='/Settings'
          element={isLoggedIn 
            ? <Settings/> 
            : <Navigate to="/"/>
          }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

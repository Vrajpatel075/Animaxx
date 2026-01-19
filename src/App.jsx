import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './assets/WebPages/Home';
import WallpaperPg from './assets/WebPages/WallpaperPg';
import BackToTop from './assets/htmlBlocks/BackToTop';
import SignIn from './assets/WebPages/SignIn';
import SignUp from './assets/WebPages/SignUp';
import { postFeedData } from '../postData';   // ✅ correct import
import { useState } from 'react';
import ViewedPost from './assets/WebPages/ViewedPost';

function App() {
  // used for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const lastPostIndex = page * limit;
  const firstPostIndex = lastPostIndex - limit;

  // slice the data for pagination
  const currentPosts = postFeedData.slice(firstPostIndex, lastPostIndex);


  // toggle light and dark mode
  const [currMode, setCurrMode] = useState("light");
  
    const toggleMode = () => {
      const newMode = currMode === "light" ? "dark" : "light";
      setCurrMode(newMode);
      document.body.classList.remove(currMode);
      document.body.classList.add(newMode);
    };

  return (
    <>
      <BrowserRouter>
        <BackToTop 
        currMode={currMode}/>
        <Routes>
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
          />} 
          />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route 
          path='/ViewedPost/:postId' 
          element={<ViewedPost 
          postdata={postFeedData} 
          currMode={currMode}
          />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import "./assets/Style/utilities.css";
import "./assets/Style/variables.css";
import toast from 'react-hot-toast';

// components
import Home from './assets/Pages/Home/Home';
import GalleryPg from './assets/Pages/Gallery/GalleryPg';
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
import ProtectedRouteOffline from './OfflineBackup/ProtectedRouteOffline';

/* ---------------- ROUTES WRAPPER (IMPORTANT) ---------------- */
function AppRoutes({ limit, page, setPage, isLoggedIn }) {
  const location = useLocation();

  // ✅ React-level navigation guard (MAIN FIX)
  useEffect(() => {
    if (!navigator.onLine && location.pathname !== "/") {
      window.location.replace("/offline.html");
    }
  }, [location]);

  return (
    <Routes>

      <Route path='/' element={<Home />} />

      <Route 
        path='/Gallery' 
        element={
          <ProtectedRouteOffline>
            <GalleryPg limit={limit} page={page} setPage={setPage} />
          </ProtectedRouteOffline>
        } 
      />

      <Route 
        path='/SignIn' 
        element={
          <ProtectedRouteOffline>
            <SignIn />
          </ProtectedRouteOffline>
        } 
      />

      <Route 
        path='/SignUp' 
        element={
          <ProtectedRouteOffline>
            <SignUp />
          </ProtectedRouteOffline>
        } 
      />

      <Route 
        path='/SignUpUserinfo' 
        element={
          <ProtectedRouteOffline>
            <SignUpUserinfo />
          </ProtectedRouteOffline>
        } 
      />

      <Route 
        path='/ViewedPost/:postId' 
        element={
          <ProtectedRouteOffline>
            <ViewedPost />
          </ProtectedRouteOffline>
        } 
      />

      <Route
        path='/ProfilePg/:userId'
        element={
          isLoggedIn 
            ? <ProfilePg />  
            : <Navigate to="/" />
        }
      />

      <Route
        path='/Settings'
        element={
          isLoggedIn 
            ? <Settings /> 
            : <Navigate to="/" />
        }
      />

    </Routes>
  );
}

/* ---------------- MAIN APP ---------------- */
function App() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const currMode = useSelector((state) => state.theme.mode);
  const [prevMode, setPrevMode] = useState(currMode);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId"));

  // ✅ Back/Forward button handling
  useEffect(() => {
    const handleNavigation = () => {
      if (!navigator.onLine && window.location.pathname !== "/") {
        window.location.replace("/offline.html");
      }
    };

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  // ✅ Page restore (bfcache fix)
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        if (!navigator.onLine && window.location.pathname !== "/") {
          window.location.replace("/offline.html");
        }
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // auth check
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setIsLoggedIn(!!storedUserId);
  }, []);

  // theme handling
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(currMode);

    if (prevMode !== currMode) {
      if (currMode === "light") {
        toast("Switched to Light theme", { icon: <BsSunFill /> });
      } else {
        toast("Switched to Dark theme", {
          icon: <IoMoon />,
          style: { background: "black", color: "white" }
        });
      }
      setPrevMode(currMode);
    }
  }, [currMode]);

  return (
    <BrowserRouter>
      <BackToTop />

      {/* ✅ ROUTES HANDLED HERE */}
      <AppRoutes 
        limit={limit}
        page={page}
        setPage={setPage}
        isLoggedIn={isLoggedIn}
      />
    </BrowserRouter>
  );
}

export default App;
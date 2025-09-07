import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css'
import Home from './assets/WebPages/Home';
import WallpaperPg from './assets/WebPages/WallpaperPg';
import NavigationPannel from './assets/htmlBlocks/NavigationPannel';
import BackToTop from './assets/htmlBlocks/BackToTop'
import FooterPannel from './assets/htmlBlocks/FooterPannel';
import SignIn from './assets/WebPages/SignIn'
import SignUp from './assets/WebPages/SignUp'
function App() {
  return (
    <>
    <BrowserRouter>
      <BackToTop/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/WallpaperPg' element={<WallpaperPg/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

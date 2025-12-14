import React, { useEffect } from 'react'
import FooterPannel from '../htmlBlocks/FooterPannel'
import "../WebPagesCss/WallpaperPg.css"
import NavigationPannel from '../htmlBlocks/NavigationPannel'
import { useNavigate } from 'react-router-dom'


function WallpaperPg() {

   const NavigateToHome = useNavigate()



  return (
    <>
        <div className="wallpaper-container">
        <div className="SearchAndNavPannel wallpaper-nav">
            <div className='Animaxx-logo'><img src="/animax img source/ANIMAX_LOGO.png" alt="logo" onClick={()=>{NavigateToHome("/")}}/></div>
            <div className="responsive_nav_searh">
                <input className="search_input" type="text" placeholder="Search..."/>
                <div className="search_icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
             <NavigationPannel />
        </div>


        <div className="wallpaper-list">
        <img src="/animax img source/yourname2.png" alt=""/>
        <img src="/animax img source/your-name-1.jpg" alt=""/>
        <img src="/animax img source/your-name-1.jpg" alt=""/>
        <img src="/animax img source/your-name-1.jpg" alt=""/>
        <img src="/animax img source/your-name-1.jpg" alt=""/>
        <img src="/animax img source/your-name-1.jpg" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
        <img src="/animax img source/5-centimeter-per-second-1.download" alt=""/>
        <img src="/animax img source/yourname1.png" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
    </div>
    </div>


    <FooterPannel/>
    </>

    
)
}

export default WallpaperPg
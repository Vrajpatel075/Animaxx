import React from 'react'

function WallpaperPg() {
  return (
    <>
    
        <div className="wallpaper-container">
        <div className="responsive-nav_searh">
            <input className="search_input" type="text" placeholder="search amazon"/>
            <div className="search_icon">
            <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <button id="open-side-nav" className="toggle-nav-btn" onclick="opensidebar()" aria-label="open sidebar" aria-expanded="false" aria-controls="navbar" >☰</button>
        </div>

        <div className="wallpaper-list">
        <img src="/animax img source/yourname2.png" alt=""/>
        <img src="/animax img source/your-name-1.jpg" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
        <img src="/animax img source/5-centimeter-per-second-1.download" alt=""/>
        <img src="/animax img source/yourname1.png" alt=""/>
        <img src="/animax img source/your-name-2.jpg" alt=""/>
    </div>
    </div>

    <FooterPannel/>
    </>

    
)
}

export default WallpaperPg
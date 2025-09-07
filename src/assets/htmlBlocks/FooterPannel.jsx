import React from 'react'
import '../cssBlocks/FooterPannel.css'

function FooterPannel() {
  return (
   <>
    <footer>
        <div className="foot-container">
                    <div className="des">
                    <div className="logo">
                    <span><img src="/animax img source/ANIMAX_LOGO.png" height="50px" width="50px" alt=""/></span>
                    <h1>ANIMAXX</h1>
                     </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate modi sunt aspernatur pariatur nulla libero odio, accus
                    </p>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-youtube"></i>
                    </div>
                    <div className="foot-title">
                        <h2>Category</h2>
                        <li>Wallpaper</li>
                        <li>Community</li>
                        <li>Bolgs</li>
                        <li>Shopping</li>
                    </div>
                    <div className="foot-title">
                        <h2>Know Us</h2>
                        <li>Blogs</li>
                        <li>Tearms</li>
                        <li>Rearch</li>
                        <li>Labs</li>
                    </div>
                    <div className="foot-title">
                        <h2>Colaborate</h2>
                        <li>Work With Us</li>
                        <li>Partner Program</li>
                        <li>Providers</li>
                        <li>Groups</li>
                    </div>
                    <div className="foot-title">
                        <h2>contact us</h2>
                        <li><span>Address:</span> karve nagar, pune.</li>
                        <li><span>Email-Id:</span> animaxx@gamil.com</li>
                        <li><span>Phone:</span> (0741)-32146541</li>
                        <li><span>mobile:</span> +91 98741-98542</li>
                    </div>

        </div>

     </footer>
   </>
  )
}

export default FooterPannel
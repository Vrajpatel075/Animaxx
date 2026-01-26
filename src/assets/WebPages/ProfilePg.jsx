import React from 'react'
import "../WebPagesCss/ProfilePg.css"

function ProfilePg() {
  return (
<>


    <div className='Profile-Container'>
        <div className="Profile-Img-Container">
            <div className='Profil-Pic'>
            <img  src="/animax img source/ANIMAX_LOGO.png" alt="Profile Pic" />
            </div>
            <div className="Profile-Content">
                <h1 className='userName'>Lorem, ipsum dolor.</h1>
                <p className='Disc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, unde.</p>
                <p className='Profile-Achivement'>Likes <span>12K</span></p> 
                <div className="Edit-Profile">
                    <button>Edit</button>
                </div>
            </div>
            <div className='Settings'>
                <button>Setting</button>
            </div>
           
            
        </div>
        <div className="Activity-Nav">
            <ul>
                <li className='Post'>Post</li>
                <li className='Save'>Save</li>
            </ul>
        </div>
        <div className="Uploded-Post"></div>
        <div className="Saved-post"></div>
    </div>
  </>
  )
}

export default ProfilePg
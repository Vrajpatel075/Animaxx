import React from 'react'
import '../cssBlocks/About.css'
import { Link } from 'react-router-dom'

function About() {
  return (
   <>
        <div id="Community" className="about-section">
        <div className="about-us">
            <div className="content">
                <div className="topic">CREATE A FREE ACCOUNT</div>
                <div className="disc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
                </div>
                <div className="button">
                    <button><Link to="/SignUp">SIGN-UP</Link></button>
                </div>
            </div>
        </div>
        <div className="about-img">
            <div className="big-circle" id="big-circle-1"></div>
            <div className="big-circle" id="big-circle-2"></div>
            <div className="about-card">
                <div className="small-circle" id="small-circle-1"></div>
                <div className="small-circle" id="small-circle-2"></div>
                <div className="small-logo-box">
                    <div className="small-logo-img"><i className="fa-solid fa-plus"></i></div>
                    <div className="dis"><span>add to friend</span></div>
                </div>
                <div className="card-img">
                </div>
                
                <div className="card-title"><span>ANIMAXX</span></div>
            </div>
        </div>
     </div>
   </>
  )
}

export default About
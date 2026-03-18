import React, { useEffect , useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../ComponentBlockCss/Features.css'
import { useSelector } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

function Features() {
    const featuresRefs = useRef(null);
    const currMode =  useSelector((state)=>state.theme.mode)
      
    useEffect(() => {
    const ctx = gsap.context(() => {
    gsap.from(".feture-page", {
      y: 250,
      opacity: 1,
      duration: 5,
      scrollTrigger: {
        trigger: ".feture-page",
        start: "top 80%",
        end: "top 90%",
        scrub: 5
      }
    });
    ScrollTrigger.refresh();
},featuresRefs);
    return () => ctx.revert(); 
  }, []);

  
  return (
    <>
    <div ref={featuresRefs}>
     <div className={`feture-page ${currMode === "light" ? "light" : "night"}`}>
        <div className="marker"></div>
        <div className="content">
        <div className="title"><h1>WHAT YOU GET</h1></div>
        <div className="dis">
            <span>Enjoy Seamless Exprence By Using Our Features Which Are Designed For You</span>
        </div>
        </div>

        <div className="fetu-box">
            <div className="flot-ball-big"></div>
            <div className="flot-ball-small"></div>
            <div className="fetu-img" id="fetu-img1"></div>
            <div className="fetu-content">
                <div className="title"><h1>FREE ACCESS TO ALL ANIME CONTENT</h1></div>
                <div className="dis">
                    <span> ipisicing elit. quo consequatur sit officiis quaerat Lorem ipsum dolor sit amet. repudiandae quae.</span>
                </div>
            </div>
        </div>
        <div className="fetu-box2">
            <div className="fetu-content">
                <div className="title"><h1>DOWNLOAD HIGH QUALITY IMAGES</h1></div>
                <div className="dis">
                    <span> ipisicing elit. quo consequatur sit officiis quaerat Lorem ipsum dolor sit amet. repudiandae quae.</span>
                </div>
            </div>
            <div className="flot-ball-big"></div>
            <div className="flot-ball-small"></div>
            <div className="fetu-img" id="fetu-img2"></div>
            
        </div>
        <div className="fetu-box">
            <div className="flot-ball-big"></div>
            <div className="flot-ball-small"></div>
            <div className="fetu-img" id="fetu-img3"></div>
            <div className="fetu-content">
                <div className="title"><h1>SHOP YOUR TREND ONLINE</h1></div>
                <div className="dis">
                    <span> ipisicing elit. quo consequatur sit officiis quaerat Lorem ipsum dolor sit amet. repudiandae quae.</span>
                </div>
            </div>
        </div>
        <div className="fetu-box2">
            <div className="fetu-content">
                <div className="title"><h1>CREATE YOUR OWN ANIME COMUNITY</h1></div>
                <div className="dis">
                    <span> ipisicing elit. quo consequatur sit officiis quaerat Lorem ipsum dolor sit amet. repudiandae quae.</span>
                </div>
            </div>
            <div className="flot-ball-big"></div>
            <div className="flot-ball-small"></div>
            <div className="fetu-img" id="fetu-img4"></div>
            
        </div>
        </div>
     </div>
    </>
  )
}

export default Features
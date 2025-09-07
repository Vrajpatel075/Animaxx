  import React, { useEffect,useState,useRef } from 'react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import '../cssBlocks/Bento.css'

  gsap.registerPlugin(ScrollTrigger);

  function Bento() {
  const bentoRef = useRef(null);
  const [currMode, setCurrMode] = useState("light");

  const toggleMode = () => {
    const newMode = currMode === "light" ? "dark" : "light";
    setCurrMode(newMode);
    document.body.classList.remove(currMode);
    document.body.classList.add(newMode);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const box3 = document.querySelector('.bento-inner-box:nth-child(3)');
      const box4 = document.querySelector('.bento-inner-box:nth-child(4)');
      const box5 = document.querySelector('.bento-inner-box:nth-child(5)');
      const hoverDiv = document.querySelector('.hover-div');
      const bentoImg2 = document.querySelector('#bento-img2');

      const moveBox3Down = () => box3 && (box3.style.transform = 'translateY(50px)');
      const resetBox3 = () => box3 && (box3.style.transform = 'translateY(0)');

      box4?.addEventListener('mouseover', moveBox3Down);
      box4?.addEventListener('mouseout', resetBox3);
      box5?.addEventListener('mouseover', moveBox3Down);
      box5?.addEventListener('mouseout', resetBox3);

      hoverDiv?.addEventListener('mouseover', () => {
        if (bentoImg2) {
          bentoImg2.style.padding = '0px 5px';
          bentoImg2.style.zIndex = '1';
        }
      });

      hoverDiv?.addEventListener('mouseout', () => {
        if (bentoImg2) {
          bentoImg2.style.padding = '0px';
        }
      });

      gsap.from("#item1", {
        x: -150,
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: "#item1",
          start: "top 75%",
          end: "top 78%",
          scrub: 3
        }
      });

      gsap.from("#item2", {
        x: 150,
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: "#item1",
          start: "top 75%",
          end: "top 78%",
          scrub: 5
        }
      });

      gsap.from("#item3", {
        x: -150,
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: "#item1",
          start: "top 35%",
          end: "top 37%",
          scrub: 3
        }
      });

      gsap.from("#item4", {
        x: 150,
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: "#item1",
          start: "top 35%",
          end: "top 37%",
          scrub: 3
        }
      });

      ScrollTrigger.refresh();
    }, bentoRef);

    return () => ctx.revert();
  }, []);

    return (
  <>
  <div ref={bentoRef}>
          <div id="wallpaper" className="bento-wall">
          <div className="ball-grad"></div>

          <div className="content">
          <div className="title"><h1>4K WALLPAPERS</h1></div>
          <div className="dis"><span>magnam quibusdam recusandae soluta nulla, dicta eum a facere? Iure incidunt ea atque quibusdam labore? sit amet consectetur lorem adipisicing elit. Reiciendis, qui. Modi, expedita accusamus quo consequatur sit officiis quaerat repudiandae quae.</span></div>
          </div>
          <div className="bento-containe">
              <div className="bento-row1">
              <div className="item" id="item1">
                  <h1>HD</h1>
                  <img src="/animax img source/suzume wallpaper.webp" alt=""/>
              </div>
              <div className="item" id="item2">
                  <img src="/animax img source/yourname1.png" alt=""/>
                  <div className="bento-inner-content">
                      <h1 className="title">POSTERS</h1>
                      <span className="dis">Download Posters And Immages Of Our Favorite Anime Movies In higH Quality Without Any Intrupting ADs.</span><br/>
                      <button className="button-transperent"><a style={{color:"white"}} to="/sub_pages_index/wallpapers.html">VIEW MORE</a></button>
                  </div>
                  <div className="bento-inner-box"></div>
                  <div className="bento-inner-box"></div>
                  <div className="bento-inner-box"></div>
                  <div className="side-grad"></div>
                  
              </div>
              </div>
              <div className="bento-row2">
              <div className="item" id="item3">
                  <img src="/animax img source/your-name-1.jpg" alt=""/>
                  <div className="bento-inner-card">
                      <div className="ball-grad"></div>
                      <div className="title">
                          <h1>Featurs</h1>
                      </div>
                      <div className="list">
                        <div className="dis">Themas</div>
                        <div className="icon" id="mode_icon">
                          <i id="mode-btn"className={`fa-solid ${currMode === "light" ? "fa-moon" : "fa-sun"}`}onClick={toggleMode}style={{ cursor: "pointer" }}></i>
                          </div>
                          </div>
                      <div className="list">
                          <div className="dis">Download</div>
                          <div className="icon"><i className="fa-solid fa-circle-down"></i></div>
                      </div>
                      <div className="list">
                          <div className="dis">Support</div>
                          <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                      </div>
                  </div>
                  <div className="bento-inner-content">
                      <h1>Inhance Your Exprence</h1>
                      <span className="dis"> Enjoy The New Features Designed For Your Confert And Seamless Exprence. 
                      </span>
                  </div>
                  <div className="bento-inner-card2">
                      <img src="/animax img source/bento-rectangle2-card.jpg" alt=""/>
                  </div>
                  <div className="side-grad"></div>
              </div>
              <div className="item" id="item4">
                  <div className="bg-img item " id="bento-img1">
                      <img src="animax img source/goblin-slayer.jpg" alt=""/>
                  </div>
                  <div className="bg-img item" id="bento-img2">
                      <img src="animax img source/mob-psycho.jpg" alt=""/>
                  </div>
                  <div className="bg-img item" id="bento-img3">
                      <img src="animax img source/black-clover-yami.webp" alt=""/>
                  </div>
                  <div className="bento-inner-content">
                      <h1>Create Your Profile</h1>
                      <span className="dis">Join With Us By Sign-Up and Create Your Own Profile For Free. </span>
                  </div>
                  <div className="side-grad"></div>
                  <div className="hover-div"></div>
              </div>
              </div>
          </div>
      </div>
      </div>
  </>
    )
  }

  export default Bento
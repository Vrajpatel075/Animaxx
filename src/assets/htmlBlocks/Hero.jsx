import React, { useEffect, useRef } from 'react';
import '../cssBlocks/Hero.css'
import { Link } from 'react-router-dom';


function Hero() {

const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runTimeout;
  let runAuto;

  const showSlider = (type) => {
    const itemSlider = listRef.current.querySelectorAll('.item');
    const itemThumbnail = thumbnailRef.current.querySelectorAll('.item');
    
    if (type === 'next') { 
        listRef.current.appendChild(itemSlider[0]);
        thumbnailRef.current.appendChild(itemThumbnail[0]);
        carouselRef.current.classList.add('next');
    } else { const lastIndex = itemSlider.length - 1;
        listRef.current.prepend(itemSlider[lastIndex]);
        thumbnailRef.current.prepend(itemThumbnail[lastIndex]);
        carouselRef.current.classList.add('prev'); }

     clearTimeout(runTimeout);

     runTimeout = setTimeout(() => {
        carouselRef.current.classList.remove('next');
        carouselRef.current.classList.remove('prev');
    }, timeRunning);


    clearTimeout(runAuto);
    runAuto = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);
  };

  useEffect(() => {
  const nextBtn = nextRef.current;
  const prevBtn = prevRef.current;
  const handleNext = () => showSlider('next');
  const handlePrev = () => showSlider('prev');

  nextBtn.addEventListener('click', handleNext);
  prevBtn.addEventListener('click', handlePrev);

  runAuto = setTimeout(() => {
    showSlider('next');
  }, timeAutoNext);

  return () => {
    nextBtn.removeEventListener('click', handleNext);
    prevBtn.removeEventListener('click', handlePrev);
    clearTimeout(runAuto);
    clearTimeout(runTimeout);
  };
}, []);

    
  return (
    <>
    <div className="carousel" ref={carouselRef}>
         <div className="list" ref={listRef}>
            <div className="item">
                <img src="/animax img source/luffy-poster.jpg" alt=""/>
                <div className="carousel-grad"></div>
                <div className="content">
                    <div className="auther">ANIMAXX</div>
                    <div className="title">BUILD YOUR OWN ANIME COMMUNITY</div>
                    <div className="topic">ONE PIECE</div>
                    <div className="disc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
                    </div>
                    <div className="button">
                        <button className="btn-black"><Link to="/SignIn">SEE MORE</Link></button>
                        <button className="btn-white"><Link to="/SignUp">SIGN-UP</Link></button>
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/bleach-poster.37ff8d8a-d79c-4cbb-ac9d-a81d32557d69" alt=""/>
                <div className="carousel-grad"></div>
                <div className="content">
                    <div className="auther">ANIMAXX</div>
                    <div className="title">BUILD YOUR OWN ANIME COMMUNITY</div>
                    <div className="topic">BLEACH</div>
                    <div className="disc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit?
                    </div>
                    <div className="button">
                    <button className="btn-black"><Link to="/SignIn">SEE MORE</Link></button>
                    <button className="btn-white"><Link to="/SignUp">SIGN-UP</Link></button>
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/haikyyu-poster.jpg" alt=""/>
                <div className="carousel-grad"></div>
                <div className="content">
                    <div className="auther">ANIMAXX</div>
                    <div className="title">BUILD YOUR OWN ANIME COMMUNITY</div>
                    <div className="topic">HAIKYUU</div>
                    <div className="disc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
                    </div>
                    <div className="button">
                    <button className="btn-black"><Link to="/SignIn">SEE MORE</Link></button>
                    <button className="btn-white"><Link to="/SignUp">SIGN-UP</Link></button>
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/demon-slayer-poster.webp" alt=""/>
                <div className="carousel-grad"></div>
                <div className="content">
                    <div className="auther">ANIMAXX</div>
                    <div className="title">BUILD YOUR OWN ANIME COMMUNITY</div>
                    <div className="topic">DEMON SLAYER</div>
                    <div className="disc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
                    </div>
                    <div className="button">
                    <button className="btn-black"><Link to="/SignIn">SEE MORE</Link></button>
                    <button className="btn-white"><Link to="/SignUp">SIGN-UP</Link></button>
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/dandadan-poster.webp" alt=""/>
                <div className="carousel-grad"></div>
                <div className="content">
                    <div className="auther">ANIMAXX</div>
                    <div className="title">BUILD YOUR OWN ANIME COMMUNITY</div>
                    <div className="topic">DANDADAN</div>
                    <div className="disc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus praesentium, reiciendis voluptatum magni reprehenderit
                    </div>
                    <div className="button">
                    <button className="btn-black"><Link to="/SignIn">SEE MORE</Link></button>
                    <button className="btn-white"><Link to="/SignUp">SIGN-UP</Link></button>
                    </div>
                </div>
            </div>

         </div>
 
         <div className="thumnail" ref={thumbnailRef}>   
            <div className="item">
                <img src="/animax img source/bleach-poster.37ff8d8a-d79c-4cbb-ac9d-a81d32557d69" alt=""/>
                <div className="content">
                    <div className="title">
                        BLEACH
                    </div>
                    <div className="disc">
                        description
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/haikyyu-poster.jpg" alt=""/>
                <div className="content">
                    <div className="title">
                        HAIKYYU
                    </div>
                    <div className="disc">
                        description
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/demon-slayer-poster.webp" alt=""/>
                <div className="content">
                    <div className="title">
                        DEMON SLAYER
                    </div>
                    <div className="disc">
                        description
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/dandadan-poster.webp" alt=""/>
                <div className="content">
                    <div className="title">
                        DANDADAN
                    </div>
                    <div className="disc">
                        description
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="/animax img source/luffy-poster.jpg" alt=""/>
                <div className="content">
                    <div className="title">
                        ONE PIECE
                    </div>
                    <div className="disc">
                        description
                    </div>
                </div>
            </div>   
         </div>

    {/* <!-- ================ARROW ============================ --> */}
         <div className="arrow">
            <button id="prev" ref={prevRef}><i className="fa-solid fa-arrow-left"></i></button>
            <button id="next" ref={nextRef}><i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <div className="time"></div>
    </div>
    </>
  )
}

export default Hero
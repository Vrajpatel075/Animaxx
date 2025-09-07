import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../cssBlocks/Shopping.css';

gsap.registerPlugin(ScrollTrigger);

function Shopping() {
  // ✅ Create refs for each card
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const yValues = [200, 100, 150, 100, 200];
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: yValues[index],
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              scroller: "body",
              start: "top 80%",
              end: "top 70%",
              scrub: 2,
            //   markers:true
            },
          });
        }
      });
    });

    return () => ctx.revert(); // ✅ Cleanup on reload
  }, []);

  // ✅ Mouse hover handlers
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };

  return (
    <>
      <div id="shop" className="shopping-section">
        <div className="title"><span>SHOP TRENDS</span></div>
        <div className="products">
          {["SWEATSHIRT", "T SHIRTS", "WATCHES", "SHIRTS", "SHOES"].map((title, index) => (
            <div
              key={index}
              className="shop_card"
              ref={(el) => (cardRefs.current[index] = el)} // ✅ Assign ref
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="product-img" id={`product_img${index + 1}`}></div>
              <div className="product-title"><span>{title}</span></div>
              <div className="detail">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <div className="price">
                  <div className="dis"><span>${[99, 49, 299, 99, 149][index]}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="explore">
          <span><a href="#">Explore</a></span>
          <span><a href="#"><i className="fa-solid fa-up-right-from-square"></i></a></span>
        </div>
      </div>
    </>
  );
}

export default Shopping;

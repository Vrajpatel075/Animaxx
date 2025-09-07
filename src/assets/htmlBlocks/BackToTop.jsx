import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../cssBlocks/BackToTop.css';

gsap.registerPlugin(ScrollTrigger);

function BackToTop() {
  const backToTopRef = useRef(null);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  useEffect(() => {
  const el = backToTopRef.current;

  gsap.set(el, { opacity: 0, y: 100 });

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (self.scroll() > 300) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5 });
      } else {
        gsap.to(el, { opacity: 0, y: 100, duration: 0.5 });
      }
    },
  });
}, []);

  return (
    <div className="back_to_top" ref={backToTopRef}>
      <div className="up_btn" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-turn-up"></i>
      </div>
    </div>
  );
}

export default BackToTop;

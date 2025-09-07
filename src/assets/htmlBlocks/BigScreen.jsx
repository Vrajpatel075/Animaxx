import React from 'react'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../cssBlocks/BigScreen.css'

gsap.registerPlugin(ScrollTrigger);
function BigScreen() {
  const screenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".show_screen", {
        y: 250,
        opacity: 1,
        duration: 5,
        scale: 0.8,
        scrollTrigger: {
          trigger: ".show_screen",
          start: "top 90%",
          end: "top 60%",
          scrub: 3,
          // markers: true // Uncomment for debugging
        }
      });

      ScrollTrigger.refresh();
    }, screenRef);

    return () => ctx.revert();
  }, []);
  return (
    <>
    <div className="show" ref={screenRef}>
    <div className="show_screen">
        <video autoPlay muted loop playsInline src="animax img source/ins_1741531115420_rotated.mp4" type="video/mp4"></video>
         <div className="show_content">
        <h1>UNLEASH YOUR INNER OTAKU.</h1>
        <p>Lorem ipsum, dolor sit amet consectetur  elit. Placeat similique tempore sapiente fuga vitae molestiae maiores harum, commodi aliquid accusantium quaerat quia Lorem ipsum dolor sit amet.
        </p>
         </div>
    </div>
    </div>
    </>
  )
}

export default BigScreen
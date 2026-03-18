import React from 'react'
import Hero from '../ComponentBlockUi/Hero'
import BigScreen from '../ComponentBlockUi/BigScreen'
import Bento from '../ComponentBlockUi/Bento'
import Features from '../ComponentBlockUi/Features'
import Blog from '../ComponentBlockUi/Blog'
import Shopping from '../ComponentBlockUi/Shopping'
import About from '../ComponentBlockUi/About'
import NavigationPannel from '../ComponentBlockUi/NavigationPannel'
import FooterPannel from '../ComponentBlockUi/FooterPannel'



function Home({toggleMode,currMode}) {
  return (
    <>   

    {/* this navcigation pannel is only user in home page as horizontal nav */}
    <NavigationPannel/>
    <Hero/>
    <BigScreen/>
    <Bento/>
    <Features/>
    <Blog/>
    <Shopping/>
    <About/>
    <FooterPannel/> 
    </>
  )
}

export default Home
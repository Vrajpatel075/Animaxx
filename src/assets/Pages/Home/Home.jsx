import React from 'react'
import Hero from './Component/Hero'
import BigScreen from './Component/BigScreen'
import Bento from './Component/Bento'
import Features from './Component/Features'
import Blog from './Component/Blog'
import Shopping from './Component/Shopping'
import About from './Component/About'
import FooterPannel from '../../Component/FooterPannel'
import NavigationPannel from '../../Component/NavigationPannel'



function Home({}) {
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
import React from 'react'
import Hero from '../htmlBlocks/Hero'
import BigScreen from '../htmlBlocks/BigScreen'
import Bento from '../htmlBlocks/Bento'
import Features from '../htmlBlocks/Features'
import Blog from '../htmlBlocks/Blog'
import Shopping from '../htmlBlocks/Shopping'
import About from '../htmlBlocks/About'
import NavigationPannel from '../htmlBlocks/NavigationPannel'
import FooterPannel from '../htmlBlocks/FooterPannel'



function Home({toggleMode,currMode}) {
  return (
    <>   

    {/* this navcigation pannel is only user in home page as horizontal nav */}
    <NavigationPannel/>
    <Hero/>
    <BigScreen/>
    <Bento toggleMode={toggleMode} currMode={currMode}/>
    <Features currMode={currMode}/>
    <Blog/>
    <Shopping/>
    <About/>
    <FooterPannel/> 
    </>
  )
}

export default Home
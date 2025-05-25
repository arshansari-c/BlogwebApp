import React from 'react'
import Navbar from '../components/Navbar'
import Animalblog from '../components/Animalblog'
import Animeblog from '../components/Animeblog'
import Newsblog from '../components/Newsblog'
import Gamingblog from '../components/Gamingblog'
import Footer from '../components/Footer'
import Searchblog from './Searchblog'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Searchblog/>
    <Animalblog/>
    <Animeblog/>
    <Newsblog/>
    <Gamingblog/>
    <Footer/>
    </>
  )
}

export default Home
import React from 'react'
import Vacancies from './Vacancies'
import Banner from './Banner'
import Companies from './Companies'
import Footer from './Footer'
import { Link } from 'react-router-dom' 
 //nquv3dHnkMe7RXJQ
const Home = () => {
  return (
    <>
      <div className="home-container">
         <div className="home-content-container">
            <h1>Get  Your  <span className='blue'>Dream Job</span> Today!</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos excepturi facilis nemo facere ducimus, laborum suscipit eligendi? Totam amet dolore ipsum doloribus explict suscipit dolores nesciunt illum doloribus placeat fuga nihil laborum het yo uk kjasd lfsjio labore consectetur eius beatae.</p>
            <Link to = "/job">
                <button className="apply-home-btn common-btn">Apply</button>
            </Link>
          </div>  
          <div className="home-img-container">
             <img src="/assets/home-img.avif" alt="" />
          </div>
      </div> 
      <Vacancies/>
      <Banner/>
      <Companies/>
      <Footer/> 
    </>
  )
}

export default Home

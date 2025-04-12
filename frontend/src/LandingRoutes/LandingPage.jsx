import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import bgcImg from '../assets/images/image12.webp'
import SlidingImages from '../components/LandingPageComponents/SlidingImages'
import CategoryBoxes from '../components/LandingPageComponents/CategoryBoxes'
import BestProducts from '../components/LandingPageComponents/BestProducts'
import AvailPlateforms from '../components/LandingPageComponents/AvailPlateforms'
import PaymentMethods from '../components/LandingPageComponents/PaymentMethods'






const LandingPage = () => {


  const Navigate = useNavigate()























  return (
    <div>




      {/* Navbar of the landing page  */}
      <Navbar />








      {/* Just for the background  */}
      <img src={bgcImg}
        className='h-[100vh] w-full fixed top-0 left-0 z-[-999] '
        alt="" />









      {/* Sliding images component */}
      <SlidingImages />













      {/* The container which contain the boxes of category wise products */}
      <CategoryBoxes/>













    {/* The conponent which contain the best product */}
    <BestProducts/>












    {/* This component contain the info about the plateform on which we also have shop */}
    <AvailPlateforms/>












    {/* This component contain the option of payment gateways with which use can pay online */}
    <PaymentMethods/>












    </div>
  )
}











export default LandingPage
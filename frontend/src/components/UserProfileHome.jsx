import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import MyContext from '../contextApi/MyContext'
import axios from 'axios'
import bgcImage from '../assets/images/image8.jpeg'
import SlidingImages from '../components/LandingPageComponents/SlidingImages.jsx'
import CategoryBoxes from '../components/LandingPageComponents/CategoryBoxes.jsx'
import BestProducts from '../components/LandingPageComponents/BestProducts.jsx'
import AvailPlateforms from '../components/LandingPageComponents/AvailPlateforms.jsx'
import PaymentMethods from '../components/LandingPageComponents/PaymentMethods.jsx'


















const UserProfileHome = () => {









  return (
    <div className='pb-10'>












      {/* The componet which control the sliding images of user profile page */}
      <SlidingImages />









      {/* The container which contain the boxes of category wise products */}
      <CategoryBoxes />









      {/* The conponent which contain the best product */}
      <BestProducts />








      {/* This component contain the info about the plateform on which we also have shop */}
      <AvailPlateforms />








      {/* This component contain the option of payment gateways with which use can pay online */}
      <PaymentMethods />














    </div>
  )
}

export default UserProfileHome
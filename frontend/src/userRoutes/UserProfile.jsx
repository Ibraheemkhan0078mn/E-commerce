import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import MyContext from '../contextApi/MyContext'
import axios from 'axios'
import bgcImage from '../assets/images/image8.jpeg'
import ProductDisplay from './ProductDisplay.jsx'
import SlidingImages from '../components/LandingPageComponents/SlidingImages.jsx'
import CategoryBoxes from '../components/LandingPageComponents/CategoryBoxes.jsx'
import BestProducts from '../components/LandingPageComponents/BestProducts.jsx'
import AvailPlateforms from '../components/LandingPageComponents/AvailPlateforms.jsx'
import PaymentMethods from '../components/LandingPageComponents/PaymentMethods.jsx'
import UserProfileHome from '../components/UserProfileHome.jsx'


















const UserProfile = () => {






  let { setUserInfo, setUserSideProductArray } = useContext(MyContext)
  let [navCatag, setNavCatag] = useState("Home")
















  useEffect(() => {
    async function userInfoRequest() {
      let response = await axios.get("/api/userRoutes/userInfo", { withCredentials: true })
      // console.log(response.data)
      setUserInfo(response.data.userInfo)

    }

    userInfoRequest()
  }, [])




















  useEffect(() => {

    async function productsRequest() {
      if (navCatag == "Home") {
        let response = await axios.get("/api/productRoutes/getAllProduct", { withCredentials: true })
        setUserSideProductArray(response.data.allProducts)
      }
    }
    productsRequest()
  }, [])





















  return (
    <div className='pb-10'>







      {/* Navabar of user profile */}
      <Navbar />













      {/* Just for the background  */}
      <img src={bgcImage}
        className='h-[100vh] w-full fixed top-0 left-0 z-[-999] '
        alt="" />









      {/* This component all the other compoent of user profile home  */}
      <UserProfileHome />















      {/* The componet which control the sliding images of user profile page */}
      {/* <SlidingImages /> */}




      {/* The container which contain the boxes of category wise products */}
      {/* <CategoryBoxes /> */}



      {/* The conponent which contain the best product */}
      {/* <BestProducts /> */}



      {/* This component contain the info about the plateform on which we also have shop */}
      {/* <AvailPlateforms /> */}


      {/* This component contain the option of payment gateways with which use can pay online */}
      {/* <PaymentMethods /> */}














    </div>
  )
}

export default UserProfile
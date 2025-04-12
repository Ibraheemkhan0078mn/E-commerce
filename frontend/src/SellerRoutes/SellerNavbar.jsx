import React, { useContext, useEffect, useState } from 'react'
// import './navbar.css'
import userIcon from '../assets/icons/user-solid.svg'
import MenuPage from './MenuPage.jsx'
import MyContext from '../contextApi/MyContext.jsx'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css';

















const SellerNavbar = () => {






  const Navigate = useNavigate()

  let [menuStatus, setMenuStatus] = useState('hide')
  let [sellerProfilePicType, setSellerProfilePicType] = useState("local")

  const { sellerInfo } = useContext(MyContext)













  useEffect(() => {
    if (sellerInfo) {
      setSellerProfilePicType("cloudinary")
    } else {
      setSellerProfilePicType("local")
    }
  }, [sellerInfo])















  async function updateMenuStatusFunction() {
    // console.log("enter in update menu funciton")
    if (menuStatus == 'hide') {
      setMenuStatus("show")
    } else if (menuStatus == "show") {
      setMenuStatus("hide")
    }
  }


  

























  return (

    // Main Div of the seller profile page navbar
    <div className='h-24 w-full fixed top-0 left-0 z-[999]  '>





    


      {/* navbar container */}
      <div className=' custom_glassy_effect      h-24 w-full flex items-center justify-between  px-16 '>



        {/* Div which contain image and name of seller */}
        <div className="h-20 min-w-60  overflow-hidden flex items-center px-5  gap-4  ">
          <img
            src={sellerProfilePicType == "local" ? userIcon : sellerInfo.imageUrl}
            className='h-14 rounded-full ' />

          <h4 className='  bg-zinc-400  text-2xl font-semibold text-zinc-700 '>{sellerInfo.name}</h4>
        </div>








        {/* Div which contain create btn and menu icon */}
        <div className='h-20 w-30 flex justify-between items-center gap-5 '>

          <i
            onClick={() => { Navigate('/ProductCreateForm') }}
            className="ri-add-circle-line         h-10 w-10 flex items-center   rounded-md text-zinc-800 text-[30px]">
          </i>


          <i
            className="ri-menu-line h-10 w-10 text-zinc-800 text-3xl"
            onClick={updateMenuStatusFunction}>
          </i>

        </div>

      </div>


















      {/* This is the div of page which only appears when click on the menu icon */}
      <div className='menuPage' style={menuStatus == "hide" ? { display: "none" } : { display: "block" }}>
        <MenuPage />
      </div>

    </div>

  )
}







export default SellerNavbar
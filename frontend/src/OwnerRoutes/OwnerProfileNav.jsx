import React, { useContext, useEffect, useState } from 'react'
import MenuBarIcon from '../assets/icons/bars-solid.svg'
import UserIcon from '../assets/icons/user-solid.svg'
import MyContext from '../contextApi/MyContext.jsx'
import bgcImage from '../assets/images/image8.jpeg'
















const OwnerProfileNav = ({ setVisibility }) => {



  let { ownerInfo } = useContext(MyContext)
  let [profilePicSrc, setProfilePicSrc] = useState("local")












  





  useEffect(() => {

    if (ownerInfo) {
      setProfilePicSrc("cloudinary")
    } else {
      setProfilePicSrc("local")
    }


  }, [ownerInfo])





















  return (

    // main Div of the owner profile navbar
    <div className='      h-28 w-full '>







      {/* just for background only */}
    <img 
    className='h-full w-full fixed top-0 left-0 z-[-999] object-cover bg-center'
    src={bgcImage} alt="" />






      {/* owner profile navbar container div */}
      <div className="  custom_glassy_effect      h-28 w-full px-10 overflow-hidden bg-zinc-300 fixed top-0 left-0 z-[999] ">







        {/* owner name and image Div of navbar */}
        <div className="h-full w-60 flex items-center gap-5  overflow-hidden">
          <img
            src={profilePicSrc == "local" ? UserIcon : ownerInfo.imageUrl}
            onClick={() => { setVisibility("show") }}
            alt=""
            className='h-16 w-16 rounded-full object-cover bg-center ' />
          <h3 className='text-zinc-800 text-2xl font-semibold '> {ownerInfo.name}</h3>
        </div>



        <div className="menubarOption">
          <i className="i-menu-line     h-16 w-16 rounded-full "></i>
        </div>



      </div>






    </div>
  )
}









export default OwnerProfileNav
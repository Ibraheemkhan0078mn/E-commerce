import React, { useContext, useEffect, useState } from 'react'
import OwnerProfileNav from './OwnerProfileNav.jsx'
import Navbar from '../components/OwnerNavbar.jsx'
import SellerDisplayOnOwnerProfile from './SellerDisplayOnOwnerProfile.jsx'
import OwnerDataPage from './OwnerDataPage.jsx'
import MyContext from '../contextApi/MyContext.jsx'
import axios from 'axios'
import bgcImage from '../assets/images/image8.jpeg'
import OwnerSideSellersUsersCard from '../components/OwnerSideSellersUsersCards.jsx'










const OwnerProfile = () => {


  let [ownerDataVisibility, setOwnerDataVisibility] = useState("hide")
  let { setOwnerInfo } = useContext(MyContext)












  useEffect(() => {

    async function getOwnerInfo() {
      let response = await axios.get("/api/ownerRoutes/ownerData", { withCredentials: true })
      // console.log(response.data)
      if (response.data) {
        if (response.data.status == "success") {
          setOwnerInfo(response.data.ownerInfo)
        }
      }

    }



    getOwnerInfo()
  }, [])




























  return (

    <div>





      {/* This is navbar of owner profile  */}
      <Navbar setVisibility={setOwnerDataVisibility} />







      {/* just for background only */}
      <img
        className='h-full w-full fixed top-0 left-0 z-[-999] object-cover bg-center'
        src={bgcImage} alt="" />








      {/* In this componet, all the seller fetched and then displayed inside this component. and then this component is displayed on current profile page of seller */}
      {/* When owner click on product button of each seller then new route open and the all the product related to this seller is displayed in the new route (productDispaly.jsx) */}
      <OwnerSideSellersUsersCard />








      {/* This is page which displayed all the data of the owner but when the seller profile picture is clicked to make the condition to execute it */}
      <div className="OwnerDataDisplaypageDiv" style={ownerDataVisibility == "hide" ? { display: 'none' } : { display: 'block' }}>
        <OwnerDataPage visibility={ownerDataVisibility} setVisibility={setOwnerDataVisibility} />
      </div>








    </div>
  )
}








export default OwnerProfile
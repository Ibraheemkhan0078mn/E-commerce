import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../contextApi/MyContext'
import 'remixicon/fonts/remixicon.css'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import axios from 'axios'



















const OwnerNavbar = () => {


    let navigate = useNavigate()
    let location = useLocation()

    let { userInfo, screenMode, setScreenMode } = useContext(MyContext)
















    function handleHomeIconClick() {
        if (location.pathname !== "/ownerProfile") {
            navigate("/ownerProfile")
        }
    }










    function handleUserIconClick() {
        if (location.pathname !== "/ownerDetails") {
            navigate("/ownerDetails");
        }
    }












    async function handleLogoutIconClick() {
        try {

            let response = await axios.get("/api/ownerRoutes/logout")
            if (response.data) {
                if (response.data.status == "success") {
                    // console.log(response.data)
                    alert(response.data.msg)
                    navigate("/")
                } else if (response?.data.status == "error") {
                    alert("Somethings went wrong")
                } else {
                    alert(response?.data.msg)
                }

            } else {
                alert("something went wrong while logout")
            }


        } catch (err) {
            console.log(err)
        }
    }


























    return (
        // Main Div of the navbar component of user
        <div className='custom_glassy_effect        h-24 w-full fixed top-0 left-0 z-[999]  '>










            {/* Container of the navbar component of user */}
            <div className="       h-24 w-full flex items-center justify-between  
            px-0     sm:px-5 ">









                {/* The logo of in navbar landing page  */}
                <img src={logo}
                    className='     h-28 w-28 sm:h-32 sm:w-32  rounded-full 
                 '
                />


































                {/* conditional rendering of left side button and icons */}






                < div className="h-full  mr-2 min-w-4 flex justify-between items-center 
                        gap-1      sm:gap-5">




                    <i
                        onClick={handleHomeIconClick}
                        className="ri-home-2-line               h-8 w-8 flex items-center   rounded-md text-zinc-800 text-[22px] font-bold cursor-pointer"></i>





                    <i
                        onClick={handleUserIconClick}
                        className="ri-user-line               h-8 w-8   flex justify-center items-center rounded-md text-zinc-800 text-[22px] font-semibold cursor-pointer"></i>



                    <i
                        onClick={() => { handleLogoutIconClick() }}
                        className="ri-logout-box-line         h-8 w-8   flex justify-center items-center rounded-md text-zinc-800 text-[22px] font-semibold cursor-pointer" ></i>



                </div>























            </div>






            {/* button for seller and user to change the data of cards
                <div className="    h-max w-full  flex justify-center mt-[-10px]  ">
                    <button className='  h-10 w-28   text-md font-bold outline-none flex gap-2 items-center justify-center  ' >
                        Users
                    </button>
                    <button className='  h-10 w-28   text-md font-bold outline-none flex gap-2 items-center justify-center  ' >
                        Sellers
                    </button>
                </div> */}






        </div >
    )
}












export default OwnerNavbar
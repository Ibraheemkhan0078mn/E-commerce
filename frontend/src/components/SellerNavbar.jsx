import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../contextApi/MyContext'
import 'remixicon/fonts/remixicon.css'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import axios from 'axios'



















const SellerNavbar = () => {


    let navigate = useNavigate()
    let location = useLocation()

    let { userInfo, screenMode, setScreenMode } = useContext(MyContext)








    // useEffect(() => {
    //     console.log(location.pathname)
    // }, [])












    function handleHomeIconClick() {
        if (location.pathname !== "/sellerProfilePage") {
            navigate("/sellerProfilePage")
        }
    }



    function handleUserIconClick() {
        if (location.pathname !== "/sellerDetails") {
            navigate("/sellerDetails");
        }
    }



    function handleAddIconClick() {
        if (location.pathname !== "/ProductCreateForm") {
            navigate("/ProductCreateForm")
        }
    }



    async function handleLogoutIconClick() {
        try {

            let response = await axios.get("/api/sellerRoutes/logout")
            if (response.data) {
                if (response.data.status == "success") {
                    // console.log(response.data)
                    alert(response.data.msg)
                    navigate("/")
                } else {
                    alert("Somethings went wrong")
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
        <div className='h-24 w-full fixed top-0 left-0 z-[999]  '>










            {/* Container of the navbar component of user */}
            <div className=" custom_glassy_effect      h-full w-full flex items-center justify-between  
            px-0     sm:px-5 ">









                {/* The logo of in navbar landing page  */}
                <img src={logo}
                    className='     h-28 w-28 sm:h-32 sm:w-32  rounded-full 
                 '
                />


































                {/* conditional rendering of left side button and icons */}


                {

                    location.pathname == "/"


                        ?


                        // the sign in and login buttons of landing page
                        <div className="flex gap-3 
                        mr-5  sm:mr-10 ">
                            <button
                                className=' custom_glassy_effect            rounded-xl  font-bold   shadow-md shadow-green-300 text-zinc-700 cursor-pointer outline-none
                        h-max w-max p-2 px-3 text-sm      sm:h-10 sm:w-20 sm:text-lg sm:px-2 '
                                onClick={() => { navigate("./userRegistration") }}
                            >
                                Sign-in
                            </button>
                            <button
                                className=' custom_glassy_effect           rounded-xl font-bold   shadow-md shadow-blue-300 text-zinc-700 cursor-pointer outline-none
                        h-max w-max p-2 px-3 text-sm      sm:h-10 sm:w-20 sm:text-lg sm:px-2  '
                                onClick={() => { navigate("./userLogin") }}
                            >
                                Log-in
                            </button>
                        </div>




                        :




                        // containing the icon like menubars or cart etc
                        < div className="h-full  mr-2 min-w-4 flex justify-between items-center 
                        gap-1      sm:gap-5">



                            <i
                                onClick={handleHomeIconClick}
                                className="ri-home-2-line               h-8 w-8 flex items-center   rounded-md text-zinc-800 text-[22px] font-bold cursor-pointer"></i>



                            <i
                                onClick={() => { handleAddIconClick() }}
                                className="ri-add-circle-line          h-8 w-8 flex items-center   rounded-md text-zinc-800 text-[22px] font-bold cursor-pointer">
                            </i>


                            <i
                                onClick={handleUserIconClick}
                                className="ri-user-line               h-8 w-8   flex justify-center items-center rounded-md text-zinc-800 text-[22px] font-semibold cursor-pointer"></i>



                            <i
                                onClick={() => { handleLogoutIconClick() }}
                                className="ri-logout-box-line         h-8 w-8   flex justify-center items-center rounded-md text-zinc-800 text-[22px] font-semibold cursor-pointer" ></i>



                        </div>






                }

















            </div>









        </div >
    )
}












export default SellerNavbar
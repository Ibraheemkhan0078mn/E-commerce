import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../contextApi/MyContext.jsx'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'



















const Navbar = () => {


    let { userInfo, screenMode, setScreenMode } = useContext(MyContext)
    let [userProfilePicType, setUserProfilePicType] = useState("local")
    let navigate = useNavigate()














    

    useEffect(() => {
        if (!userInfo) {
            setUserProfilePicType("local")
        } else {
            setUserProfilePicType("cloudinary")
        }
    }, [userInfo])

























    return (
        // Main Div of the navbar component of user
        <div className='h-24 w-full fixed top-0 left-0 z-[999] '>



            {/* Container of the navbar component of user */}
            <div className=" custom_glassy_effect      h-24 w-full flex items-center justify-between  px-16 ">





                {/* contain the image and name of the user */}
                <div className="h-20 w-60  overflow-hidden flex items-center px-5  gap-4 ">
                    {userProfilePicType == "local" ?
                        <i className="ri-user-3-fill       h-12 w-12 flex items-center   rounded-md text-zinc-800 text-[30px]"></i>
                        :
                        <img src={userInfo ? userInfo.imageUrl : null} className=' h-12 w-12 flex items-center justify-center rounded-full border-blue-200  ' />}
                    <h3 className=' text-zinc-800 font-semibold text-xl ml-4 '>{userInfo ? userInfo.name : "username"}</h3>
                </div>









                {/* contians the list of route of user side */}
                {/* <div className="">
                    <ul className='h-full w-10 flex justify-between items-center gap-5 text-zinc-800 font-semibold text-2xl mr-32'>

                        <li 
                        onClick={() => {
                            navigate("/userProfile");
                            setScreenMode("home");
                        }}
                            className='cursor-pointer'
                            style={screenMode == "home" ? { color: "darkblue", borderBottom: "3px solid darkblue", paddingBottom: "2px" } : null} >
                                Home</li>




                        <li
                            onClick={() => {
                                navigate("/allProductDisplay");
                                setScreenMode("products");
                            }}
                            className='cursor-pointer'
                            style={screenMode == "products" ? { color: "darkblue", borderBottom: "3px solid darkblue", paddingBottom: "2px" } : null}
                        >Products</li>




                    </ul>
                </div>

 */}














                {/* containing the icon like menubars or cart etc */}
                <div className="h-full min-w-4 flex justify-between items-center gap-5">
                    <i
                        onClick={() => { navigate("/userCart"); setScreenMode("cart") }}
                        className="ri-shopping-cart-fill          h-10 w-10   flex justify-center items-center rounded-md text-zinc-800 text-[30px]"
                        style={screenMode == "cart" ? { color: 'darkblue', borderBottom: "5px solid darkblue", paddingBottom: "5px" } : null}></i>

                    <i className="ri-menu-line                   h-10 w-10 flex items-center   rounded-md text-zinc-800 text-[30px]"></i>
                </div>











            </div>









        </div>
    )
}

export default Navbar
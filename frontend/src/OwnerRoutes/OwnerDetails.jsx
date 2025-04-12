import React, { useContext, useEffect } from 'react'
import bgcImage from '../assets/images/image8.jpeg'
import Navbar from '../components/OwnerNavbar.jsx'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import MyContext from '../contextApi/MyContext.jsx'
import axios from 'axios'









const OwnerDetails = () => {



    let navigate = useNavigate()
    let { ownerInfo, setOwnerInfo } = useContext(MyContext)
















    useEffect(() => {
        // if (!ownerInfo || ownerInfo == "") {
            async function fetchSellerData() {

                let response = await axios.get("/api/ownerRoutes/ownerData")
                if (response.data) {
                    setOwnerInfo(response.data.ownerInfo)
                }

            }

            fetchSellerData()
        // }
    }, [])


















    function handleEditOwnerBtnClick() {
        navigate("/ownerUpdate")
    }
















    return (
        <div className="p-5 overflow-x-hidden">






            {/* to display the navbar of user on the top */}
            <Navbar />















            {/* This is just for backgroudn image */}
            <img className='h-full w-full object-cover fixed top-0 left-0 z-[-999]' src={bgcImage} alt="" />















            {/* this contain the card in side which the image and all data of use is present */}
            <div className='custom_glassy_effect      h-max w-60% mt-40 rounded-xl flex items-center sm:items-start sm:justify-start flex-col xl:flex-row  relative pt-14 px-5 sm:px-10  '>





                {/* This is the button to edit the data of user */}
                <div className="h-10 w-full absolute top-5 right-10  ">
                    <button
                        onClick={() => { handleEditOwnerBtnClick() }}
                        className='h-max w-24 p-1 bg-yellow-600 absolute top-0 right-0 outline-none rounded-lg flex items-center justify-center gap-2 font-semibold text-zinc-800'>
                        Edit
                        <i className="ri-pencil-line    h-5 w-5 mb-2 text-zinc-600 "></i>
                    </button>
                </div>






                {/* image of user */}
                <div className="h-max w-full max-w-96  rounded-lg flex justify-center items-center ">
                    <img
                        className='h-max w-80  p-5 rounded-3xl'
                        src={ownerInfo?.imageUrl} alt="" />
                </div>





                {/* Other details of user */}
                <div className="h-max w-full py-10 sm:p-10 sm:pl-16">
                    <div className="h-max w-full flex items-center">
                        <h1 className='h-max w-28 text-wrap break-words whitespace-normal font-bold text-lg' >Name:</h1>
                        <span className='font-normal text-[15px] text-zinc-800 ml-3'> {ownerInfo?.name}</span>
                    </div>


                    <div className="h-max w-full flex items-center">
                        <h1 className='h-max w-28 text-wrap break-words whitespace-normal font-bold text-lg'>Email:</h1>
                        <span className='font-normal text-[15px] text-zinc-800 ml-3'>{ownerInfo?.email}</span>
                    </div>


                    <div className="h-max w-full flex items-center">
                        <h1 className='h-max w-32 text-wrap break-words whitespace-normal font-bold text-lg flex items-start'>Password:</h1>
                        <span className='w-[90%] font-normal text-[15px] text-zinc-800 break-words whitespace-normal ml-10 pr-24'> {ownerInfo?.password}</span>
                    </div>


                    <div className="h-max w-full flex items-center break-words whitespace-normal">
                        <h1 className='h-max w-32 text-wrap break-words whitespace-normal font-bold text-lg flex'>CNIC:</h1>
                        <span className='w-[90%] font-normal text-[15px] text-zinc-800 break-words whitespace-normal ml-10 sm:ml-3   '> {ownerInfo?.cnic}</span>
                    </div>


                    <div className="h-max w-full flex items-center">
                        <h1 className='h-max w-28 text-wrap break-words whitespace-normal font-bold text-lg flex '>GST No:</h1>
                        <span className='w-max font-normal text-[15px] text-zinc-800 break-words whitespace-normal ml-3'>{ownerInfo?.gstNo}</span>
                    </div>

                </div>



            </div>








        </div>
    )
}

export default OwnerDetails
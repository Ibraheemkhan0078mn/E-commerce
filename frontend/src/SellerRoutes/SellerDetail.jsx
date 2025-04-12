import React, { useContext, useEffect } from 'react'
import bgcImage from '../assets/images/image8.jpeg'
import image from '../assets/images/image6.jpeg'
import Navbar from '../components/SellerNavbar.jsx'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import MyContext from '../contextApi/MyContext.jsx'
import axios from 'axios'









const SellerDetails = () => {



    let navigate = useNavigate()
    let {sellerInfo, setSellerInfo } = useContext(MyContext)
















    useEffect(() => {
        if (!sellerInfo || sellerInfo == "") {
            async function fetchSellerData() {

                let response = await axios.get("/api/sellerRoutes/sellerData")
                if (response.data) {
                    setSellerInfo(response.data.sellerData)
                }

            }

            fetchSellerData()
        }
    }, [])


















    function handleEditUserBtnClick() {
        navigate("/SellerDataUpdateForm")
    }
















    return (
        <div className="p-5 overflow-x-hidden">






            {/* to display the navbar of user on the top */}
            <Navbar />















            {/* This is just for backgroudn image */}
            <img className='h-full w-full object-cover fixed top-0 left-0 z-[-999]' src={bgcImage} alt="" />















            {/* this contain the card in side which the image and all data of use is present */}
            <div className='custom_glassy_effect      h-max w-60% mt-40 rounded-xl flex items-center sm:items-start sm:justify-start flex-col sm:flex-row relative pt-14  '>





                {/* This is the button to edit the data of user */}
                <div className="h-10 w-full absolute top-5 right-10  ">
                    <button
                        onClick={() => { handleEditUserBtnClick() }}
                        className='h-max w-24 p-1 bg-yellow-600 absolute top-0 right-0 outline-none rounded-lg flex items-center justify-center gap-2 font-semibold text-zinc-800'>
                        Edit
                        <i className="ri-pencil-line    h-5 w-5 mb-2 text-zinc-600 "></i>
                    </button>
                </div>






                {/* image of user */}
                <div className="h-max w-full max-w-96  rounded-lg flex justify-center items-center ">
                    <img
                        className='h-max w-80  p-5 rounded-lg'
                        src={sellerInfo?.imageUrl} alt="" />
                </div>





                {/* Other details of user */}
                <div className="h-max w-max p-5">

                    <h1 className='h-max w-72 text-wrap break-words whitespace-normal font-bold text-lg' >Name: <span className='font-normal text-[15px] text-zinc-800'> {sellerInfo?.name}</span></h1>
                    <h1 className='h-max w-72 text-wrap break-words whitespace-normal font-bold text-lg'>Phone No: <span className='font-normal text-[15px] text-zinc-800'>{sellerInfo?.phoneNo}</span> </h1>
                    <h1 className='h-max w-72 text-wrap break-words whitespace-normal font-bold text-lg'>Email: <span className='font-normal text-[15px] text-zinc-800'>{sellerInfo?.email}</span></h1>
                    <h1 className='h-max w-72 text-wrap break-words whitespace-normal font-bold text-lg'>Address: <span className='font-normal text-[15px] text-zinc-800'>{sellerInfo?.address}</span></h1>
                    <h1 className='h-max w-72 text-wrap break-words whitespace-normal font-bold text-lg flex'>Password: <span className='w-[90%] font-normal text-[15px] text-zinc-800 break-words whitespace-normal'> {sellerInfo?.password}</span></h1>

                </div>



            </div>








        </div>
    )
}

export default SellerDetails
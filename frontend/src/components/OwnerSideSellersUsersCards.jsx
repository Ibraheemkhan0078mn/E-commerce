import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserIcon from '../assets/icons/user-solid.svg'
import MyContext from '../contextApi/MyContext'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

























const OwnerSideSellersUsersCard = () => {





    let { setOwnerSideProductArray } = useContext(MyContext)
    // This contain the data of card rendered on owner profile. this data change between for users and seller according to condition
    const [cardsDataArray, setCardsDataArray] = useState([])
    const Navigate = useNavigate()
    const [OwnerSideSellerUserCardDataMode, setOwnerSideSellerUserCardDataMode] = useState("seller")














    useEffect(() => {
        getSellerData()
    }, [])



    async function getSellerData() {
        // console.log("entered in getSellerData function")
        let response = await axios.get("/api/ownerRoutes/getAllSellersData")
        if (response.data.status == "success") {
            setCardsDataArray(response.data.SellersArray)
        } else {
            alert("somethings went wrong in getting data of seller")
        }
        // console.log(response.data)
    }




    async function getUserData() {
        // console.log("entered in getSellerData function")
        let response = await axios.get("/api/ownerRoutes/getAllUsersData")
        if (response?.data.status == "success") {
            setCardsDataArray(response.data.UserDataArray)
        } else {
            alert("somethings went wrong in getting data of seller")
        }
        // console.log(response.data)
    }












    async function fetchProductData(sellerData) {
        let sellerId = sellerData._id

        let response = await axios.post("/api/ownerRoutes/sellerOwnProductDisplay", { sellerId: sellerId })



        // owner profile kolte hi hum ne sare sellers ke data ko fetch ker liye that aur separatly sare seller ko show kiya tha
        // see product ke button press kerte he ye wala fucntioin execute hoga aur seller id backend ke url per bej de ga
        // backend me product model me dhonde ga wo product ji ke seller section ki id is se match ho jaye
        // aur sare product jis ki seller section ka stirng is se match ho jata hai ye use product array me return ker de ga
        setOwnerSideProductArray(response.data.ProductsArray)

        Navigate("/ownerSideProductDisplay")

    }



























    async function deleteSellerOrUser(cardData) {
        // console.log(sellerData)
        let response = await axios.post("/api/ownerRoutes/sellerOrUserDelete",
            {
                id: cardData._id,
                mode: OwnerSideSellerUserCardDataMode
            },
            { withCredentials: true })

        // console.log(response.data)

            if (response?.data.status == "success") {
                setCardsDataArray(response.data.data)

            } else if (response?.data.status == "err") {
                alert(response.data.msg)
            }
    }











    function handleUserBtnClick() {
        setOwnerSideSellerUserCardDataMode("user")
        getUserData()
    }











    function handleSellerBtnClick() {
        setOwnerSideSellerUserCardDataMode("seller")
        getSellerData()
    }



























    return (
        // main div of this component
        <div className=' min-h-[50vh] w-full   flex gap-x-2 gap-y-2  justify-center flex-wrap pt-24 '>







            {/* This div contain the button of seller and user */}
            <div className="          h-16 w-full flex justify-center py-5 mb-5  ">



                <button
                    onClick={() => { handleSellerBtnClick() }}
                    className='  h-10 w-28  border border-zinc-400 rounded-l-lg bg-green-600 text-sm font-semibold sm:font-normal outline-none flex gap-2 items-center justify-center  '
                    style={OwnerSideSellerUserCardDataMode == "seller" ? { borderBottom: "5px solid black", fontSize: "15px", fontWeight: "bold" } : null}
                >
                    seller
                    <i className="ri-store-2-line               h-4 w-4   flex justify-center items-center rounded-md text-zinc-800 text-[15px] font-semibold cursor-pointer"></i>
                </button>


                <button
                    onClick={() => { handleUserBtnClick() }}
                    className='  h-10 w-28  border border-zinc-400 rounded-r-lg bg-yellow-500 text-sm font-semibold sm:font-thin outline-none flex gap-2 items-center justify-center  '
                    style={OwnerSideSellerUserCardDataMode == "user" ? { borderBottom: "5px solid black", fontSize: "15px", fontWeight: "bold" } : null}
                >
                    Users
                    <i className="ri-user-line               h-4 w-4   flex justify-center items-center rounded-md text-zinc-800 text-[15px] font-semibold cursor-pointer"></i>
                </button>

            </div>







            {/* applying map loop on sellerArray which contain the data of all the sellers on this plateform */}
            {
                cardsDataArray.map((eachCardData, index) => {
                    return (

                        // Main Div which contain the data of each seller
                        <div key={index} className="custom_glassy_effect     h-max w-44 sm:w-52 p-2 rounded-lg ">



                            {/* Div which contain image on seller data card */}
                            <div className="     h-full w-full flex justify-center ">
                                {
                                    // <i className="ri-user-fill   text-[100px]"></i>
                                    <img
                                        src={eachCardData?.imageUrl}
                                        className='h-full w-full rounded-md'
                                        alt="" />

                                }
                            </div>









                            {/* other data of the seller */}
                            <h2 className='h-auto w-full text-center mt-3 font-bold text-sm sm:text-lg' >{eachCardData.name}</h2>
                            <h2 className='h-auto w-full text-center font-semibold text-sm text-zinc-700 '>{eachCardData.email}</h2>
                            <h2 className='h-auto w-full text-center font-semibold  text-sm text-zinc-700 '>{eachCardData.phoneNo}</h2>



                            {/* button to show the products of the related seller */}
                            <div className="h-auto w-full flex gap-2 px-1">

                                <button
                                    className='h-8 w-full mt-4 bg-blue-800 rounded-md flex items-center justify-center text-zinc-300  text-sm  sm:text-sm outline-none'
                                    onClick={() => { fetchProductData(eachCardData) }}
                                    style={OwnerSideSellerUserCardDataMode !== "seller" ? { display: "none" } : null}
                                >
                                    Products
                                </button>
                                <button
                                    className='h-8 w-full mt-4 bg-red-800 rounded-md flex items-center justify-center text-zinc-300 text-sm sm:text-sm  outline-none cursor-pointer '
                                    onClick={() => { deleteSellerOrUser(eachCardData) }}>
                                    Delete
                                </button>
                            </div>

                        </div>

                    )
                })}





        </div>
    )
}














export default OwnerSideSellersUsersCard
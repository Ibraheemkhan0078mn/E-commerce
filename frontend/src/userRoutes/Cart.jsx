import React, { useContext, useEffect, useState } from 'react'
import bgcImage from '../assets/images/image8.jpeg'
import Navbar from '../components/Navbar.jsx'
import axios from 'axios'
import MyContext from '../contextApi/MyContext.jsx'
import { useNavigate } from 'react-router-dom'
























const Cart = () => {

    let navigate = useNavigate()
    let [cartProductArray, setCartProductArray] = useState([])
    let { setCurrentClickedProductData,
        setUserInfo
     } = useContext(MyContext)













    useEffect(() => {
        async function addToCartRequest() {
            let response = await axios.get("/api/productRoutes/getAddToCartProducts", { withCredentials: true })
            // console.log(response.data.allCartProducts)
            setCartProductArray(response.data.allCartProducts)
        }

        addToCartRequest()
    }, [])















    function handleEachCartProductDetailBtnClick(eachProductData) {
        setCurrentClickedProductData(eachProductData)
        navigate("/singleProduct")
    }






async function handleCardProductDelIconClick(eachProductDetail){
    try{

        let productId= eachProductDetail._id

        console.log(productId)
        let response= await axios.post("/api/productRoutes/removeFromCard",{productId:productId},{withCredentials:true}  )

        if(response?.data){
            // console.log(response.data.updatedUser)
            setCartProductArray(response.data.updatedUser.cart)
            setUserInfo(response.data.updatedUser)
            // setCartProductArray(response.data.updatedUser.cart)
        }

    }catch(err){
        console.log("error from handleCardProductDelIconClick in Cart.jsx", err)
    }
}























    return (
        <div className='min-h-[100vh] w-full flex  flex-wrap p-2 sm:p-10  gap-x-3 gap-y-0  '>












            {/* This is just for backgroudn image */}
            <img className='h-full w-full object-cover fixed top-0 left-0 z-[-999]' src={bgcImage} alt="" />












            {/* For top of navbar */}
            <Navbar />















            {/* The container which contain all the cart products */}
            <div className="min-h-[40vh] w-full flex  flex-col pt-24 ">


                {cartProductArray && cartProductArray.length > 0 ?

                    cartProductArray.map((eachProduct, index) => {
                        return (
                            <div
                                key={index}
                                className=' custom_glassy_effect        max-h-[12vh] sm:max-h-[10vh]  h-max w-full mb-2 flex flex-1 items-center justify-between rounded-xl px-3 sm:px-8 py-4 pt-10 sm:pt-4 '
                            >


                                <div className="flex items-center mt-[-20px] sm:mt-0">
                                    <img className='max-h-[10vh] w-14 sm:w-12 rounded-full mr-2'
                                        src={eachProduct.imageUrl} alt="" />
                                    <h2 className=' text-lg sm:text-[15px]  font-semibold sm:font-semibold flex flex-1'>{eachProduct.name}</h2>
                                </div>


                                <div className="flex relative pr-4">

                                    <button
                                        onClick={() => { handleEachCartProductDetailBtnClick(eachProduct) }}
                                        className=' h-10 sm:h-8 w-16 sm:w-20 flex justify-center items-center rounded-xl mr-1 sm:mr-2 text-zinc-300 bg-green-900 text-sm '>
                                        Details</button>

                                    <button className=' h-10 sm:h-8 w-16 sm:w-20 flex justify-center items-center rounded-xl mr-1 sm:mr-2 text-zinc-300 bg-zinc-900 text-sm'>
                                        Buy</button>

                                    <i 
                                    onClick={()=>{handleCardProductDelIconClick(eachProduct)}}
                                    className="ri-delete-bin-5-line       h-6 w-6 text-red-300 bg-zinc-800  absolute top-[-28px] sm:top-[-8px] right-0 sm:right-[-15px] rounded-full text-sm flex justify-center items-center cursor-pointer"></i>
                                    {/* <button className='h-5 w-5 text-zinc-100 bg-zinc-800 absolute top-[-8px] right-[-15px] rounded-full text-sm flex justify-center items-center'>X</button> */}
                                </div>

                            </div>
                        )
                    })




                    :
                    


                    <div className="custom_glassy_effect     h-max w-max p-2 px-5 rounded-lg">
                        No Product are found in cart
                    </div>

                }




            </div>





        </div>
    )
}

export default Cart
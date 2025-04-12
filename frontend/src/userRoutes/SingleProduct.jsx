import React, { useContext } from 'react'
import MyContext from '../contextApi/MyContext.jsx'
import bgcImage from '../assets/images/image8.jpeg'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'





const SingleProduct = () => {




    let navigate = useNavigate()
    let { currentClickedProductData,
        setCurrentClickedProductData } = useContext(MyContext)













    useEffect(() => {

        if (!currentClickedProductData) {
            navigate("/userProfile")
        }

    }, [])









    async function handleAddToCartBtnClick() {
        let response = await axios.post("/api/productRoutes/addToCart", { productId: currentClickedProductData._id }, { withCredentials: true })
        if (response?.data){
          console.log(response.data)
      }
    
      }











    






    return (
        <div className='h-full w-full overflow-x-hidden pt-40 p-5  '>




            {/* to display the navbar of user on the top */}
            <Navbar />









            {/* This is just for backgroudn image */}
            <img className='h-full w-full object-cover fixed top-0 left-0 z-[-999] ' src={bgcImage} alt="" />













            <div className=" custom_glassy_effect      h-max w-full flex flex-col  sm:flex-row p-5 rounded-lg gap-x-10">


                {/* <div className="h-max w-max max-w-[10%]"> */}
                    <img
                        className='w-full max-w-96  mr-10'
                        src={currentClickedProductData?.imageUrl} alt="" />
                {/* </div> */}





                <div className="p-5 ">

                    <h1 className='custom_glassy_effect_low     p-2 rounded-lg h-max w-full font-bold mb-2 text-xl '><span className='text-sm'>Rs. </span>{currentClickedProductData?.price} </h1>
                    <h1 className='custom_glassy_effect_low     p-2 rounded-lg h-max w-full font-semibold mb-10 break-words whitespace-normal'>{currentClickedProductData?.name}</h1>


                    <div className="mb-10">
                        <div className="custom_glassy_effect_low        h-max w-full   flex gap-x-3 p-2 rounded-lg mb-2">
                            <i className="ri-shield-cross-fill"></i>
                            <h1>14 days easy return </h1>
                        </div>

                        <div className="custom_glassy_effect_low        h-max w-full  flex gap-x-3 p-2 rounded-lg ">
                            <i className="ri-ship-2-fill"></i>
                            <h1>Buy 3 for free shipping</h1>
                        </div>
                    </div>



                    <div className="h-max w-full p-2  flex justify-between  ">
                        <button
                            onClick={() => { handleAddToCartBtnClick(currentClickedProductData) }}
                            className='h-max w-40 bg-yellow-500 p-2 rounded-lg text-sm font-semibold flex items-center justify-center outline-none'>
                            Add to cart
                            <i className="ri-shopping-cart-2-line     h-5 w-5 ml-4 text-xl font-thin mb-2"></i>
                        </button>
                        {/* <button className='h-max w-40 bg-red-500 p-2 rounded-lg font-semibold flex items-center justify-center'>Buy now</button> */}
                    </div>


                </div>




            </div>








        </div>

    )




}







export default SingleProduct
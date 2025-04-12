import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../contextApi/MyContext'
import { useLocation, useNavigate } from 'react-router-dom'

const CategoryBoxes = () => {

    let location= useLocation()
    let Navigate= useNavigate()
    let [catagWiseProductArray, setCatagWiseProductArray] = useState([])
    let { catagoryArray,
        setPreviousRoute,
        setUserSideProductArray
     } = useContext(MyContext)
















    useEffect(() => {
        async function request() {
            let response = await axios.post("/api/productRoutes/fourProductOfEach", { productCatagArray: catagoryArray })
            // console.log(response.data.finalProductArray)
            setCatagWiseProductArray(response.data.finalProductArray)

        }
        request()
    }, [])













function handleEachCatagClick(currentClickedCatagProducts){
    console.log(location.pathname)
    setPreviousRoute(location.pathname)
    setUserSideProductArray(currentClickedCatagProducts)
    Navigate("/ProductDisplay")
}
















    return (
        <div className='  custom_glassy_effect            h-max w-full p-10 pt-24 mt-5 sm:mt-16 relative  flex  gap-x-10 gap-10  overflow-x-scroll   '>






            {/* Catagory heading */}
            <h1 className='text-2xl font-semibold absolute top-5'>Catagories...</h1>







            {/* This render the product which data is feched from the backend with axios */}
            <div className="h-max w-max flex flex-row gap-x-2 sm:gap-x-10 items-center">


                {catagWiseProductArray.map((eachCatagProducts, index) => {

                    if (eachCatagProducts.length == 0) {
                        return null;
                    } else {

                        return (<div 
                        key={index} 
                        onClick={()=>{handleEachCatagClick(eachCatagProducts)}}
                        className="custom_glassy_effect   sm:min-h-28 w-max max-w-72 p-5 rounded-lg flex flex-col items-center justify-center text-xl font-semibold flex-shrink-0  ">

                            <div className="min-h-[50%] w-full flex justify-center  flex-wrap gap-4  mb-10 ">
                                {eachCatagProducts.map((eachProduct, index) => {
                                    return (<img
                                        key={index}
                                        src={eachProduct.imageUrl}
                                        className='h-28 w-28 bg-zinc-800 rounded-md' />)
                                })}
                            </div>

                            <h1 className='text-2xl font-bold'>{catagoryArray[index]}</h1>
                        </div>


                        )



                    }


                })}


            </div>
















        </div>
    )
}

export default CategoryBoxes
import React, { useContext } from 'react'
import { useEffect } from 'react'
import MyContext from '../../contextApi/MyContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
















const BestProducts = () => {


    let navigate = useNavigate()
    let { landingPageBestProducts, 
        setLandingPageBestProducts, 
        setScreenMode,
        setCurrentClickedProductData
    } = useContext(MyContext)









    useEffect(() => {
        async function request() {
            let response = await axios.get("/api/productRoutes/bestProducts")
            // console.log(response.data.products)
            setLandingPageBestProducts(response.data.products)

        }
        request()
    }, [])








    function handleEachBestProductClick(eachProductData){
        setCurrentClickedProductData(eachProductData)
        navigate("/singleProduct")
    }
























    return (
        // main div of bestProducts component
        <div className='custom_glassy_effect     min-h-[40vh] min-w-full p-3  sm:p-10 pt-24 mt-5 flex flex-shrink-0 gap-x-10 relative    '
            onClick={(e) => { if (e.target == e.currentTarget) { navigate("/allProductDisplay"); setScreenMode("products") } }}>



            {/* Heading of best product box */}
            <h1 className='text-2xl absolute top-5 pl-5 font-bold'> Top Products...</h1>






            <div className="h-max w-max flex flex-row overflow-x-auto gap-5 sm:gap-10 pt-0 sm:pt-10 outline-none items-center">

                {landingPageBestProducts && landingPageBestProducts.length > 0 ?
                    landingPageBestProducts.map((eachProduct, index) => {
                        {/* This div contain the each product image, name and price */ }
                        return <div 
                        onClick={()=>{handleEachBestProductClick(eachProduct)}}
                        key={index} 
                        className="custom_glassy_effect  min-h-[100px] sm:min-h-[100px] w-52  p-5 rounded-lg flex flex-col items-center text-xl font-semibold flex-shrink-0  ">
                            <img src={eachProduct.imageUrl} className='min-h-[40%] w-full bg-zinc-800 flex justify-center flex-wrap gap-4 mb-10' alt="" />
                            <h1>{eachProduct.name}</h1>
                            <h1>$ {eachProduct.price}</h1>
                        </div>
                    })

                    :

                    null
                }

            </div>















        </div>
    )
}










export default BestProducts
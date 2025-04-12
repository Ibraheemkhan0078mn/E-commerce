import React, { useContext } from 'react'
import MyContext from '../contextApi/MyContext.jsx'
import bgcImage from '../assets/images/image8.jpeg'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'















const ProductDisplay = () => {


  let navigate= useNavigate()


  let { userSideProductArray,
    setUserSideProductArray,
    setCurrentClickedProductData,
    previousRoute
  } = useContext(MyContext)












  useEffect(() => {

    async function fetchAllProducts() {
      try {

        // we make the condition that if user comes on this route by clicking the catagory box in userprofile then render the product of this catag. 
        // otherwise fetch your own data and render it.
        if(previousRoute!=="/userProfile"){
          
          let response = await axios.get("/api/productRoutes/getAllProduct", { withCredentials: true })

          if (response?.data.allProducts) {
            setUserSideProductArray(response.data.allProducts)
          } else {
            console.error("product is not fetched correctly")
          }
  
        }

       
      } catch (err) {
        console.log("Error from User side product display", err)
      }
    }


    fetchAllProducts()



  }, [])











  async function handleAddToCartBtnClick(productId, event) {
    event.stopPropagation()
    // console.log("handleadd to cart is clicked")
    let response = await axios.post("/api/productRoutes/addToCart", { productId: productId }, { withCredentials: true })
    if (response?.data){
      // console.log(response.data)
  }

  }










  function handleEachProductClick(eachProductData){
    // console.log(eachProductData)
    setCurrentClickedProductData(eachProductData)
    navigate("/singleProduct")
  }


















  return (

    // Main Div of product Display component
    <div className='min-h-[100vh] w-full flex items-center flex-wrap p-5 sm:p-10 pt-5 sm:pt-28 gap-x-3 gap-y-3  '>









      {/* to display the navbar of user on the top */}
      <Navbar />









      {/* This is just for backgroudn image */}
      <img className='h-full w-full object-cover fixed top-0 left-0 z-[-999]' src={bgcImage} alt="" />










      {/* Here takes the products array from the context and then apply map loop on it */}
      <div className="flex flex-wrap gap-2">

        {
          userSideProductArray.map((eachProduct, index) => {
            return (

              <div
                onClick={()=>{handleEachProductClick(eachProduct)}}
                className=" custom_glassy_effect      h-max w-40 sm:w-48 p-2 rounded-md flex flex-col items-center"
                key={index}>

                <img src={eachProduct.imageUrl} alt={eachProduct.name} className="h-full w-full rounded-lg mb-4" />



                <div className="h-auto w-full flex flex-col gap-0 items-center mb-4">
                  <h3 className="text-zinc-800 text-lg font-bold ">{eachProduct.name}</h3>
                  <p className="text-zinc-700 text-md ">${eachProduct.price}</p>
                </div>



                <button
                  onClick={(event) => { handleAddToCartBtnClick(eachProduct._id, event) }}
                  className="h-8 w-[90%] bg-blue-800 rounded-md  flex items-center justify-center text-zinc-200 outline-none sm:text-sm sm:font-bold ">
                  Add to cart
                </button>



              </div>




            )

          })
        }

      </div>








    </div>
  )
}

export default ProductDisplay
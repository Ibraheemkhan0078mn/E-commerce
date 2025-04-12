import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SellerProfilePageNavbar from '../components/SellerNavbar.jsx'
import { useNavigate } from 'react-router-dom'
import MyContext from '../contextApi/MyContext.jsx'
import bgcImage from '../assets/images/image8.jpeg'
import SellerProduct from '../components/SellerProduct.jsx'



















const SellerProfile = () => {



  const [sellerProductArrayMode, setSellerProductArrayMode] = useState("All")
  const { setProductData,
    setSellerInfo,
    setSellerSideProductArray
  } = useContext(MyContext)
  const Navigate = useNavigate()









  useEffect(() => {
    getAllProductsRequest()
    getSellerInfo()
  }, [])









  async function getAllProductsRequest() {
    let response = await axios.get('/api/productRoutes/getAllProduct', { withCredentials: true })

    if (response.data) {
      setSellerSideProductArray(response.data.allProducts)
    }


  }











  async function getSellerInfo() {
    let response = await axios.get("/api/sellerRoutes/sellerData", { withCredentials: true })
    // console.log(response.data)
    setSellerInfo(response.data.sellerData)

  }




























 async function handleMyProductBtnClick(){
  try{

    setSellerProductArrayMode("My Product")

    let response= await axios.get("/api/productRoutes/getEachSellerProducts", {withCredentials:true})
    if(response.data){
      // console.log(response.data)
      setSellerSideProductArray(response.data.products)
    }

  }catch(err){
    console.log(err)
  }
}






 async function handleAllProductBtnClick(){
  setSellerProductArrayMode("All")
  try{

    let response= await axios.get("/api/productRoutes/getAllProduct", {withCredentials:true})
    if(response.data){
      console.log(response.data.allProducts)
      setSellerSideProductArray(response.data.allProducts)
    }

  }catch(err){
    console.log(err)
  }
  
}















  return (
    // This is the main div of this component
    <div className="min-h-[100vh] w-full p-5 pt-28">





      {/* Navbar component of seller is attached here */}
      <SellerProfilePageNavbar />



      {/* The work of this is only of the backgrund image */}
      <img
        className='h-full w-full bg-center object-cover fixed top-0 left-0 z-[-999]'
        src={bgcImage} alt="" />









    {
      sellerProductArrayMode=="All"?


      <div className="h-max w-full relative">
      <button 
      onClick={()=>{handleMyProductBtnClick()}}
      className='       h-max w-max bg-green-500 outline-none p-2 px-4 rounded-md font-bold text-sm  absolute right-0 top-0'>My Products</button>
    </div>



:

<div className="h-max w-full relative">
<button 
onClick={()=>{handleAllProductBtnClick()}}
className='       h-max w-max bg-yellow-500 outline-none p-2 px-4 rounded-md font-bold text-sm  absolute right-0 top-0'>All Products</button>
</div>



    }

    


  





<div className="h-max w-full flex justify-center mt-10 ">
        <div className=" custom_glassy_effect      h-max w-32 px-3 p-2 flex justify-center items-center rounded-lg">
          {sellerProductArrayMode}
        </div>
      </div>











      {/* THis contain the products c */}
      <SellerProduct    sellerProductArrayMode={sellerProductArrayMode}/>







      {/* checking only that whether i have products not not and present profile div according to it */}
      {/* {productsArray.length == 0 ?

        <h1 className=' custom_glassy_effect    min-h-[80px] w-[50%] flex items-center px-20  fixed top-[20%] text-zinc-900 font-semibold text-3xl rounded-md ml-10 '>The product is not present yet!</h1>




        :






        <div className=' min-h-[70vh] w-full p-20 pl-28 pt-32 flex  items-center gap-x-5 gap-y-7 flex-wrap  '>

          {
            productsArray.map((eachProduct, index) => {
              return (

                <div className=" custom_glassy_effect  min-h-64 w-52 p-2 rounded-lg" key={index}>
                  <img src={eachProduct.imageUrl} alt={eachProduct.name} className="h-full w-full rounded-lg" />



                  <div className="h-full w-full flex flex-col justify-center items-center gap-2">
                    <h3 className="text-zinc-800 mt-2">{eachProduct.name}</h3>
                    <p className="text-zinc-700 mb-5">${eachProduct.price}</p>

                  </div>


                  <div className="h-full w-full flex justify-between mb-2 gap-3">
                    <button className="h-10 w-1/2 bg-blue-700 rounded-md text-zinc-200 outline-none" data-product_data={JSON.stringify(eachProduct)} onClick={updateProduct} >Update</button>
                    <button className="h-10 w-1/2 bg-red-700 rounded-md text-zinc-200 outline-none" onClick={() => { deleteProduct(eachProduct._id) }}>Delete</button>
                  </div>
                </div>



              )
            })
          }
        </div>

      } */}




    </div>






  )




}















export default SellerProfile;
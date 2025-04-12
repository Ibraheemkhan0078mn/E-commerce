import React, { useContext, useEffect } from 'react'
import MyContext from '../contextApi/MyContext.jsx'
import Navbar from '../components/OwnerNavbar.jsx'
import axios from 'axios'
import bgcImage from '../assets/images/image8.jpeg'



















const ProductDisplayOnOwnerDisplay = () => {



  const { ownerSideProductArray, setOwnerSideProductArray } = useContext(MyContext)


  async function deleteProduct(productId) {
    // console.log(productId)

    let ProductId = { "productId": productId }

    let response = await axios.post('/api/productRoutes/deleteProduct', ProductId)
    // console.log(response.data)

    setOwnerSideProductArray(response.data.sellerRelatedProducts)


  }



























// This is the conditional rendering of some html code 
  if (ownerSideProductArray.length == 0) {






    return (
      <div className='pt-32'>



{/* The navbar */}
        <Navbar/>





        
        {/* just for background only */}
        <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover bg-center'
                src={bgcImage} alt="" />
        
        






        <div className=' custom_glassy_effect      p-2'>
          <h1 className='emptyArrayMsg'>The product by this seller is not present yet!</h1>
        </div>




      </div>

    )








  }


  else {








    return (
      <div className='h-max w-full overflow-x-hidden pt-10'>

        <Navbar />









        {/* just for background only */}
              <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover bg-center'
                src={bgcImage} alt="" />
        
        
        












        <div className='h-max w-full p-24 flex flex-wrap  gap-x-4 gap-y-8 '>

          {
            ownerSideProductArray.map((eachProduct, index) => {
              return (

                <div className="custom_glassy_effect      h-max w-48 p-2 rounded-lg" key={index}>
                  <img src={eachProduct.imageUrl} alt={eachProduct.name} 
                  className="h-full w-full object-cover mb-3" />



                  <div className="h-auto w-full flex flex-col items-center">
                    <h3 className="text-xl font-semibold">{eachProduct.name}</h3>
                    <p className="text-zinc-900">${eachProduct.price}</p>
                  </div>


                    <button className="h-9 w-full bg-red-500 flex items-center justify-center mt-3 text-zinc-300 rounded-lg outline-none" onClick={() => { deleteProduct(eachProduct._id) }}>Delete</button>


                </div>




              )
            })
          }
        </div>

      </div>



    )
  }




}




















export default ProductDisplayOnOwnerDisplay
import React, { useContext, useEffect } from 'react'
import MyContext from '../contextApi/MyContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SellerProduct = ({ sellerProductArrayMode }) => {





  let { sellerSideProductArray,
    setSellerSideProductArray,
    setProductData
   } = useContext(MyContext)

   let Navigate= useNavigate()


  // useEffect(()=>{
  //   console.log(sellerSideProductArray)
  // },[sellerSideProductArray])






  // This is for update the product
  async function updateProduct(e) {
    e.stopPropagation()
    Navigate('/ProductUpdateForm')
    let productData = e.target.dataset.product_data
    setProductData(JSON.parse(productData))
    // console.log(JSON.parse(productData))
  }

















  // To delete the product when delete button is clicked
  async function deleteProduct(event,productId) {
    // console.log(productId)
    event.stopPropagation()

    let ProductId = { "productId": productId }

    let response = await axios.post('/api/productRoutes/deleteProduct', ProductId)
    // console.log(response.data)
    
    setSellerSideProductArray(response?.data.sellerRelatedProducts)

  }






















  return (
    //    Here takes the products array from the context and then apply map loop on it 
    <div className="flex flex-wrap gap-2 pt-10">









      {
        sellerSideProductArray?.length > 0

          ?


          sellerSideProductArray.map((eachProduct, index) => {
            return (

              <div
                onClick={() => { handleEachProductClick(eachProduct) }}
                className=" custom_glassy_effect      h-max w-40 sm:w-48 p-2 rounded-md flex flex-col items-center"
                key={index}>

                <img src={eachProduct.imageUrl} alt={eachProduct.name} className="h-full w-full rounded-lg mb-4" />



                <div className="h-auto w-full flex flex-col gap-0 items-center mb-4">
                  <h3 className="text-zinc-800 text-lg font-bold ">{eachProduct.name}</h3>
                  <p className="text-zinc-700 text-md ">${eachProduct.price}</p>
                </div>


                {
                  sellerProductArrayMode == "All" ?
                    null :

                    <div className="h-full w-full flex justify-between mb-2 gap-3">

                      <button className="h-10 w-1/2 bg-blue-700 rounded-md text-zinc-200 outline-none" data-product_data={JSON.stringify(eachProduct)}
                        onClick={updateProduct}
                         >Update</button>

                      <button className="h-10 w-1/2 bg-red-700 rounded-md text-zinc-200 outline-none"
                        onClick={(event) => { deleteProduct(event,eachProduct._id) }}>
                          Delete</button>

                    </div>


                }



              </div>




            )

          })




          :


          <div className="     h-max w-full flex justify-center items-center">
            <h2 className='custom_glassy_effect  h-max w-max p-2 px-5 rounded-lg font-bold'>No product is found!</h2>
          </div>



      }

    </div>
  )
}

export default SellerProduct
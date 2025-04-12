import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserIcon from '../assets/icons/user-solid.svg'
import MyContext from '../contextApi/MyContext'
import { useNavigate } from 'react-router-dom'

























const SellerDisplayOnOwnerProfile = () => {










  let { setOwnerSideProductArray } = useContext(MyContext)
  const [sellerArray, setSellerArray] = useState([])

  const Navigate = useNavigate()














  useEffect(() => {

    async function getSellerData() {
      // console.log("entered in getSellerData function")
      let response = await axios.get("/api/ownerRoutes/AllSellerDisplay")
      setSellerArray(response.data.SellersArray)
      // console.log(response.data)
    }
    getSellerData()
  }, [])




















  async function fetchProductData(sellerData) {
    let sellerId = sellerData._id

    // console.log(sellerId)

    let response = await axios.post("/api/ownerRoutes/sellerOwnProductDisplay", { sellerId: sellerId })

    // console.log(response.data.ProductsArray)


    // owner profile kolte hi hum ne sare sellers ke data ko fetch ker liye that aur separatly sare seller ko show kiya tha
    // see product ke button press kerte he ye wala fucntioin execute hoga aur seller id backend ke url per bej de ga
    // backend me product model me dhonde ga wo product ji ke seller section ki id is se match ho jaye
    // aur sare product jis ki seller section ka stirng is se match ho jata hai ye use product array me return ker de ga
    setOwnerSideProductArray(response.data.ProductsArray)

    Navigate("/ownerSideProductDisplay")

  }























  



  async function deleteSeller(sellerData) {
    // console.log(sellerData)
    let response = await axios.post("/api/ownerRoutes/sellerDelete", { sellerId: sellerData._id }, { withCredentials: true })
    // console.log(response.data)

    if (response.data) {
      if (response.data.status == "success") {
        setSellerArray(response.data.allSellers)
        // console.log(sellerArray)

      } else if (response.data.status == "err") {
        alert(response.data.msg)
      }
    }
  }



































  

  return (
    // main div of this component
    <div className=' min-h-[100vh] w-full px-16  flex gap-x-8 gap-y-12 items-center flex-wrap  '>




      {/* applying map loop on sellerArray which contain the data of all the sellers on this plateform */}
      {
      sellerArray.map((eachSeller, index) => {
        return (

          // Main Div which contain the data of each seller
          <div key={index} className="custom_glassy_effect      min-h-9 w-56 p-2 rounded-lg ">







            {/* Div which contain image on seller data card */}
            <div className="     h-full w-full flex justify-center ">
              {
                eachSeller.imageUrl ?

                  // <i className="ri-user-fill   text-[100px]"></i>
                  <img
                    src={eachSeller.imageUrl}
                    className='h-full w-full rounded-md'
                    alt="" />
                  :

                  <i className="ri-user-fill   text-[100px] "></i>
              }
            </div>








            {/* other data of the seller */}
            <h2 className='h-auto w-full text-center mt-3 font-semibold' >{eachSeller.name}</h2>
            <h2 className='h-auto w-full text-center font-semibold'>{eachSeller.email}</h2>
            <h2 className='h-auto w-full text-center font-semibold mb-2'>{eachSeller.phoneNo}</h2>


            {/* button to show the products of the related seller */}
            <div className="h-auto w-full flex gap-2 px-1">
              <button
                className='h-8 w-full mt-4 bg-blue-800 rounded-md flex items-center justify-center text-zinc-300 '
                onClick={() => { fetchProductData(eachSeller) }}>
                Products
              </button>
              <button
                className='h-8 w-full mt-4 bg-red-800 rounded-md flex items-center justify-center text-zinc-300 '
                onClick={() => { deleteSeller(eachSeller) }}>
                Delete
              </button>
            </div>

          </div>

        )
      })}





    </div>
  )
}














export default SellerDisplayOnOwnerProfile
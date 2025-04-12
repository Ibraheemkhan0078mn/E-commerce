import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import bgcImg1 from '../assets/images/image12.webp'
import MyContext from '../contextApi/MyContext'








const OwnerUpdate = () => {



  const Navigate = useNavigate()
  let { setOwnerInfo } = useContext(MyContext)
  const [laoderVisibility, setLoaderVisibility] = useState("none")

  let [ownerData, setOwnerData] = useState({
    OwnerImage: '',
    name: '',
    email: "",
    password: "",
    gstNo: '',
    secretKey: "",
    cnic: ''
  })











  useEffect(() => {
    async function getOwnerData() {
      let response = await axios.get("/api/ownerRoutes/ownerData", { withCredentials: true })
      // console.log(response.data)
      if (response.data) {
        if (response.data.status == "success") {
          setOwnerData(response.data.ownerInfo)
        } else if (response?.data.status == "failed") {
          alert(response?.data.msg)
        } else {
          alert("Somethings went wrong in fetching data from backend")
        }
      }
    }
    getOwnerData()
  }, [])










  async function handleSubmit(e) {
    e.preventDefault()

    setLoaderVisibility("visible")


    try {

      let formData = new FormData()

      for (const key in ownerData) {
        formData.append(key, ownerData[key])
      }

      let response = await axios.post("api/ownerRoutes/ownerDataUpdate", formData, { withCredentials: true })
      // console.log(response.data)

      if(response.data){
        setLoaderVisibility("none")
      }

      if (response?.data.status == 'success') {
        alert("The owner's data is updated")
        setOwnerInfo(response?.data.updatedOwner)
        Navigate("/ownerDetails")
      } 
      
      else if (response?.data.status == "failed") {
        alert("The owner creation is failed due to some reasons")
      }





    } catch (err) {
      setLoaderVisibility("none")
      console.log(err)
    }

    // console.log(ownerData)

  }



































  return (












    // main div of the component
    <div className=" min-h-[100vh] w-screen  flex justify-center items-center " >








      {/* just for background image to make it non movable */}
      <div
        className=" h-screen w-screen fixed top-0 left-0 bg-cover bc-center z-[-999]"
        style={{ backgroundImage: `url(${bgcImg1})` }}></div>












      {/* Container Div of Seller Registration form */}
      <div className="custom_glassy_effect    min-h-[90vh] w-[90%] sm:w-[600px] flex-col p-4 sm:p-7 pt-7  mt-20 rounded-2xl sm:rounded-3xl   ">











        {/* heading of seller registration form */}
        <h2 className="mb-4 w-full flex justify-center text-3xl font-bold" >Owner Edit</h2>













        {/* main form of seller registration */}
        <form onSubmit={handleSubmit} className='min-h-[70vh] w-full flex flex-col gap-2 p-5   '>


          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Image:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-900 flex justify-center rounded-md bg-transparent border border-gray-800 outline-none"
              type="file"
              name="OwnerImage"
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.files[0] }) }}
            />
          </label >


          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Name:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="name"
              value={ownerData.name}
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.value }) }} placeholder="Enter you name...."
              required
            />
          </label>


          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Email:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="email"
              value={ownerData.email}
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.value }) }} placeholder="Enter you e-mail...."
              required
            />
          </label>




          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            CNIC:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="cnic"
              value={ownerData.cnic}
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.value }) }} placeholder="Enter you c-nic number...."
              required
            />
          </label>


          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Password:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="password"
              value={ownerData.password}
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.value }) }} placeholder="Enter your password..."
              required
            />
          </label>






          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Secret Key:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="secretKey"
              value={ownerData.secretKey}
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.value }) }} placeholder="Enter your password..."
              required
            />
          </label>






          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Gst No:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="gstNo"
              value={ownerData.gstNo}
              onChange={(e) => { setOwnerData({ ...ownerData, [e.target.name]: e.target.value }) }} placeholder="Enter your password..."
              required
            />
          </label>










          {/* submitting button of owner Registration form */}
          <button
            className="h-11 w-full bg-yellow-600 text-xl text-zinc-200 rounded-lg flex items-center justify-center mb-3"
            type="submit">
            Edit

            <div
              style={laoderVisibility == "none" ? { display: "none" } : { display: "block" }}
              className="h-max w-max absolute top-1/2 right-10 sm:right-40 -translate-y-1/2 ">
              <Loader hw={20} />
            </div>


          </button>
















        </form>
      </div>



















    </div>








  )
}

export default OwnerUpdate
import React, { useContext, useState } from "react";
import axios from "axios";
// import "./SellerDataUpdate.css";
import { useNavigate } from "react-router-dom";
import MyContext from "../contextApi/MyContext.jsx";
import bgcImg1 from '../assets/images/image12.webp'
import Loader from "../components/Loader.jsx";




const SellerDataUpdate = () => {


  const Navigate = useNavigate()
  const { sellerInfo } = useContext(MyContext)
  const [formData, setFormData] = useState(sellerInfo);
  const [laoderVisibility, setLoaderVisibility] = useState("none")
















  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };











  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaderVisibility("visible")
    try {
      const response = await axios.post("/api/sellerRoutes/updateSeller", formData, { withCredentials: true });
     
      if(response.data){
        setLoaderVisibility("none")
      }

      if(response?.data.status==success){
        alert("Seller updated successfully!");
        Navigate('/sellerProfilePage')

      }else{
        alert("Somethings went wrong")
      }
      // console.log(response.data);



    } catch (error) {
      setLoaderVisibility("none")
      console.error("Error registering seller:", error);
      alert("Failed to register seller.");
    }
  };
























  return (



    // main div of the component
    <div className=" min-h-[100vh] w-screen  flex justify-center items-center " >








      {/* just for background image to make it non movable */}
      <div
        className=" h-screen w-screen fixed top-0 left-0 bg-cover bc-center z-[-999]"
        style={{ backgroundImage: `url(${bgcImg1})` }}></div>












      {/* Container Div of Seller Update form */}
      <div className="custom_glassy_effect    min-h-[50vh] w-[600px] flex-col p-7 mt-20 rounded-3xl   ">



        {/* heading of seller Update form */}
        <h2 className="mb-4 w-full flex justify-center text-3xl font-bold" >Seller Update</h2>





        {/* main form of seller Update */}
        <form onSubmit={handleSubmit} className='min-h-[50vh] w-full flex flex-col gap-2 p-5   '>




          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Name:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter you name...."
              required
            />
          </label>


          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Email:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter you e-mail...."
              required
            />
          </label>




          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            CNIC:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="Enter you c-nic number...."
              required
            />
          </label>




          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Phone Number:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Enter your phone number...."
              required
            />
          </label>



          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Password:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              required
            />
          </label>











          <button type="submit"
            className="h-11 w-[95%] mr-auto ml-auto mt-5 bg-blue-600 text-xl text-zinc-200 rounded-lg flex items-center justify-center mb-3 relative">
            Update Product

            <div 
            style={laoderVisibility == "none" ? { display: "none" } : { display: "block" }}
              className="h-max w-max absolute top-1/2 right-10 sm:right-40 -translate-y-1/2 ">
              <Loader hw={20} />
            </div>


          </button>


















        </form>
      </div>




    </div>











  );
};





export default SellerDataUpdate;

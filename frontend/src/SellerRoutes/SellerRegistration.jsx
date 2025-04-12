import React, { useState } from "react";
import axios from "axios";
// import  "./SellerRegistrationForm.css";
import { useNavigate } from "react-router-dom";
import bgcImg1 from '../assets/images/image12.webp'
import Loader from "../components/Loader";



const SellerRegistrationForm = () => {




  const Navigate = useNavigate()

  const [laoderVisibility, setLoaderVisibility] = useState("none")

  const [formData, setFormData] = useState({
    sellerImage: '',
    name: "",
    email: "",
    cnic: "",
    phoneNo: "",
    password: "",
  });

















  function loginPageNavigation() {
    Navigate('/sellerLogin')
  }

















  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };








  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] })
  }














  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaderVisibility("visible")
    try {

      const uploadingformData = new FormData()

      for (const key in formData) {
        uploadingformData.append(key, formData[key])
      }

      const response = await axios.post("/api/sellerRoutes/Register", uploadingformData, { withCredentials: true });
      if(response.data){
        setLoaderVisibility("none")
        alert("Seller registered successfully!");
      }
      Navigate('/sellerProfilePage')


    } catch (error) {
      console.error("Error registering seller:", error);
      setLoaderVisibility("none")
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












      {/* Container Div of Seller Registration form */}
      <div className="custom_glassy_effect    min-h-[90vh] w-[90%] sm:w-[600px] flex-col p-4 sm:p-7 pt-7  mt-20 rounded-2xl sm:rounded-3xl   ">



        {/* heading of seller registration form */}
        <h2 className="mb-4 w-full flex justify-center text-xl sm:text-3xl font-bold" >Seller Registration</h2>





        {/* main form of seller registration */}
        <form onSubmit={handleSubmit} className='min-h-[70vh] w-full flex flex-col gap-2 p-5   '>


          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Image:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-900 flex justify-center rounded-md bg-transparent border border-gray-800 outline-none"
              type="file"
              name="sellerImage"
              onChange={handleFileChange}

            />
          </label >


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










          {/* button to submit the form of seller registration */}
          <button
            className="h-11 w-[98%] mx-auto mt-5 bg-blue-600 text-xl text-zinc-200 rounded-lg flex items-center justify-center mb-3 relative"
            type="submit">
            Register


            <div
              style={laoderVisibility == "none" ? { display: "none" } : { display: "block" }}
              className="h-max w-max absolute top-1/2 right-10 sm:right-40 -translate-y-1/2 ">
              <Loader hw={20} />
            </div>


          </button>







          {/* link which redirect the user to seller login page */}
          <h2 className="h-11 w-full p-3 flex items-center gap-2 font-normal sm:font-bold  sm:underline">
            Already have Account
            <button
              className="text-blue-600"
              onClick={loginPageNavigation}>Log-in</button>
          </h2>














          {/* The buttons to navigate to Owner or Seller Registration */}
          <div className="h-max w-full flex flex-col sm:flex-row gap-5 sm:gap-0 items-center sm:items-start justify-between mt-10 px-0">
            <button
              className="h-11 w-max px-10 bg-orange-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/userRegistration") }}
            >
              Register as User
            </button>

            <button
              className="h-11 w-max px-10 bg-green-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/ownerRegister") }}>
              Register as Owner
            </button>
          </div>
























        </form>
      </div>




    </div>


  );
};

export default SellerRegistrationForm;

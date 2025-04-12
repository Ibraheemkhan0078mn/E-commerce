import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import bgcImg1 from '../assets/images/image12.webp'
import Loader from "../components/Loader";















const UserLogin = () => {



  let Navigate = useNavigate()

  const [laoderVisibility, setLoaderVisibility] = useState("none")

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });












  const handleChange = (e) => {


    setFormData({ ...formData, [e.target.name]: e.target.value });

  };










  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoaderVisibility("visible")
    const url = "/api/userRoutes/login";






    // console.log(formData)


    try {
      const response = await axios.post(url, formData, { withCredentials: true });
      // console.log(response.data);

      if(response.data){
          setLoaderVisibility("none")
      }

      if (response?.data.status == "success") {
        alert(response?.data.msg);
        Navigate("/userProfile")
      } else if (response?.data.status == "failed") {
        alert(response?.data.msg)
      }


    } catch (error) {
      setLoaderVisibility("none")
      alert("An error occurred while submitting the login form.");
      console.error(error);
    }
  };














  return (






    // main div of the component
    <div className=" min-h-[100vh] w-screen  flex justify-center items-center overflow-x-hidden" >








      {/* just for background image to make it non movable */}
      <div
        className=" h-full w-screen fixed top-0 left-0 bg-cover bc-center z-[-999]"
        style={{ backgroundImage: `url(${bgcImg1})` }}></div>












      {/* Container Div of Seller Registration form */}
      <div className="custom_glassy_effect    min-h-[50vh] w-[90%] sm:w-[600px] flex-col p-4 sm:p-7 pt-7  mt-20 rounded-2xl sm:rounded-3xl   ">









        {/* heading of seller registration form */}
        <h2 className="mb-4 w-full flex justify-center text-2xl sm:text-3xl font-bold" >User Login</h2>





        {/* main form of seller registration */}
        <form onSubmit={handleSubmit} className='min-h-[50vh] w-full flex flex-col gap-2 p-5   '>



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






          {/* submmit button of user Login  */}
          <button
            className="h-11 w-[98%] mx-auto bg-blue-600 text-xl text-zinc-200 rounded-lg flex items-center justify-center mb-3 mt-5 relative"
            type="submit">
            Login

            <div
              style={laoderVisibility == "none" ? { display: "none" } : { display: "block" }}
              className="h-max w-max absolute top-1/2 right-10 sm:right-40 -translate-y-1/2 ">
              <Loader hw={20} />
            </div>

          </button>





















          {/* User Login ALready have an accound link */}
          <h2 className="h-11 w-[550px] p-3 px-5 flex items-center gap-2 underline font-bold">
            No Account
            <button
              className="text-blue-600 cursor-pointer"
              onClick={(e) => { Navigate("/userRegistration") }}>
              Sign_in
            </button>
          </h2>



















          {/* The buttons to navigate to Owner or Seller Login */}
          <div className="h-max w-full flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-0 justify-between mt-10   ">
            <button
              className="h-11 w-max px-10 bg-orange-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/ownerLogin") }}
            >
              Login as Owner
            </button>

            <button
              className="h-11 w-max px-10 bg-green-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/sellerLogin") }}
            >
              Login as Seller
            </button>
          </div>



















        </form>
      </div>




    </div>









  );
};

export default UserLogin;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgcImg1 from '../assets/images/image12.webp'
import Loader from "../components/Loader";






const SellerLogin = () => {


  let Navigate = useNavigate()

  const [laoderVisibility, setLoaderVisibility] = useState("none")


  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
















  function SignInNavigation() {
    Navigate("/sellerRegister")
  }























  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaderVisibility("visible")

    const formData = { cnic, email, password };

    try {
      const response = await axios.post("/api/sellerRoutes/Login", formData, { withCredentials: true });
      // console.log(response.data)

      if (response.data) {
        setLoaderVisibility("none")
      }

      if (response.data == "No Account") {
        alert("The seller id on this email is not present. Are you want to sign in")
        Navigate('/sellerRegister')
      } else if (response.data == 'Password not matched') {
        alert("Password is Invalid")
      } else if (response.data == 'Success login') {
        Navigate('/sellerProfilePage')
      }


      setMessage({ text: "Form submitted successfully!", type: "success" });





    } catch (error) {
      setLoaderVisibility("none")
      setMessage({ text: "Error submitting the form. Please try again.", type: "error" });
      console.error(error);
    }
  };



































  return (

    // main Div of Seller Login page
    <div className=" min-h-[100vh] w-screen  flex justify-center items-center overflow-x-hidden" >






      {/* just for background image to make it non movable */}
      <div
        className=" h-full w-screen fixed top-0 left-0 bg-cover bc-center z-[-999] "
        style={{ backgroundImage: `url(${bgcImg1})` }}></div>









      {/* Container Div of Seller Login form */}
      <div className="custom_glassy_effect    min-h-[20vh] w-[90%] sm:w-[600px] flex-col p-4 sm:p-7 pt-7  mt-20 rounded-2xl  sm:rounded-3xl   ">

        {/* Heading of Seller Login form */}
        <h2 className="mb-4 w-full flex justify-center text-2xl sm:text-3xl font-bold"> Seller Login </h2>









        {/* Form tag of Seller Login page */}
        <form onSubmit={handleSubmit} className='min-h-[30vh] w-full flex flex-col gap-2 p-5   '>





          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Email:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="Enter you c-nic number...."
              required
            />
          </label>





          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Password:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              required
            />
          </label>






          {/* button which submit the form of seller login  */}
          <button
            className="h-11 w-[98%] mx-auto mt-5 bg-blue-600 text-xl text-zinc-200 rounded-lg flex items-center justify-center mb-3 relative"
            type="submit">
            Login

            <div
              style={laoderVisibility == "none" ? { display: "none" } : { display: "block" }}
              className="h-max w-max absolute top-1/2 right-10 sm:right-40 -translate-y-1/2 ">
              <Loader hw={20} />
            </div>


          </button>






          {/* This redirect the seller to seller registration */}
          <h2 className="h-11 w-[550px] p-3 flex items-center gap-2 font-bold underline">
            No Account
            <button
              className="text-blue-600 "
              onClick={SignInNavigation}>Sign-in</button>
          </h2>


















          {/* The buttons to navigate to Owner or user Login */}
          <div className="h-max w-full flex  flex-col sm:flex-row  items-center sm:items-start gap-5 sm:gap-0 justify-between mt-10   ">
            <button
              className="h-11 w-max px-10 bg-orange-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/ownerLogin") }}
            >
              Login as Owner
            </button>

            <button
              className="h-11 w-max px-10 bg-green-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/userLogin") }}
            >
              Login as User
            </button>
          </div>





















        </form>





        {
          message && (
            <p className={`message ${message.type}`}>
              {message.text}
            </p>
          )
        }





      </div >


    </div >
  );
};

export default SellerLogin;

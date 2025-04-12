import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgcImg1 from '../assets/images/image12.webp'
import Loader from '../components/Loader';






const OwnerLogin = () => {


  const Navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    cnic: '',
    secretKey: '',
    password: '',
  });

  const [laoderVisibility, setLoaderVisibility] = useState("none")









  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };






  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaderVisibility("visible")

    try {
      const response = await axios.post('/api/ownerRoutes/ownerLogin', formData);

      if (response.data) {
        setLoaderVisibility("none")
      }

      if (response?.data.status == 'success') {
        alert("The owner is logged in")
        Navigate('/ownerProfile')
      } else if (response?.data.status == 'failed') {
        alert(response.data.msg)
      } else {
        alert("Something went wrong while login the owner")
      }


    } catch (error) {
      setLoaderVisibility("none")
      console.error('Error:', error);
      alert('Error submitting the data!');
    }
  };














  return (






    // main div of the component
    <div className=" min-h-[100vh] w-screen  flex justify-center items-center " >








      {/* just for background image to make it non movable */}
      <div
        className=" h-full w-screen fixed top-0 left-0 bg-cover bc-center z-[-999]"
        style={{ backgroundImage: `url(${bgcImg1})` }}></div>












      {/* Container Div of Seller Registration form */}
      <div className="custom_glassy_effect    min-h-[50vh] w-[90%] sm:w-[600px] flex-col p-4 sm:p-7 pt-7  mt-20 rounded-2xl sm:rounded-3xl   ">



        {/* heading of seller registration form */}
        <h2 className="mb-4 w-full flex justify-center text-2xl sm:text-3xl font-bold" >Owner Login</h2>





        {/* main form of seller registration */}
        <form onSubmit={handleSubmit} className='min-h-[50vh] w-full flex flex-col gap-2 p-5   '>





          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Email:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} placeholder="Enter you e-mail...."
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
              onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} placeholder="Enter you c-nic number...."
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
              onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} placeholder="Enter your password..."
              required
            />
          </label>






          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Secret Key:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="secretKey"
              value={formData.secretKey}
              onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} placeholder="Enter your password..."
              required
            />
          </label>















          {/* button which submit the form of owner login credentials */}
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








          {/* this link redirect the owner to owner registration form */}
          <h2 className="h-11 w-[550px] p-3 flex justify-start gap-2 font-bold underline">
            No Account
            <button
              className="text-blue-600 cursor-pointer"
              onClick={() => { Navigate("/ownerRegister") }}>Sign_in</button>
          </h2>










          {/* The buttons to navigate to Owner or Seller Login */}
          <div className="h-max w-full flex  flex-col sm:flex-row  items-center sm:items-start gap-5 sm:gap-0 justify-between mt-10 px-2   ">
            <button
              className="h-11 w-max px-10 bg-yellow-600 flex justify-center items-center text-zinc-200 rounded-lg cursor-pointer outline-none"
              onClick={() => { Navigate("/userLogin") }}
            >
              Login as User
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

export default OwnerLogin;

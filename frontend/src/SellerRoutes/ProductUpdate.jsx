import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
// import "./ProductUpdateForm.css"; // Import the CSS file
import MyContext from "../contextApi/MyContext.jsx";
import { useNavigate } from 'react-router-dom'
import bgcImg1 from '../assets/images/image12.webp'
import Loader from "../components/Loader.jsx";










const ProductUpdate = () => {





  const { productData, catagoryArray } = useContext(MyContext)

  const [formData, setFormData] = useState({ ...productData, image: "" });

  const Navigate = useNavigate()

  const [laoderVisibility, setLoaderVisibility] = useState("none")








  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "image") {
      setFormData({ ...formData, [name]: e.target.files[0] })
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
























  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoaderVisibility("visible")

    try {

      let ask = confirm("Are you seriously want to update it?")

      if (ask) {


        console.log(formData)
        let formDataToSend= new FormData()

        for (let i in formData){
          formDataToSend.append(i, formData[i])
        }

        console.log(formDataToSend.entries())

        const response = await axios.post(
          "/api/productRoutes/updateProduct", formDataToSend, { withCredentials: true }
        );

        if (response.data) {
          setLoaderVisibility("none")
        }

        if (response.data.status == "success") {
          Navigate('/sellerProfilePage')
        } else {
          alert(response?.data.msg)
        }


        // console.log(response.data);


      }



    } catch (error) {
      setLoaderVisibility("none")
      console.error("Error creating product:", error.response?.data || error.message);
      alert("Failed to create product");
    }
  };




































  return (


    // main div of the component
    <div className=" min-h-[100vh] w-screen  flex justify-center items-center " >










      {/* just for background image to make it non movable */}
      <div
        className=" h-screen w-screen fixed top-0 left-0 bg-cover bc-center z-[-999]"
        style={{ backgroundImage: `url(${bgcImg1})` }}></div>












      {/* Product update form Glassy Container */}
      <div className="custom_glassy_effect    min-h-[90vh] w-[600px] flex-col p-7 mt-20 rounded-3xl   ">




        {/* Product update form container heading */}
        <h2 className="mb-4 w-full flex justify-center text-3xl font-bold" >Product Update</h2>















        {/* product update form main form tag */}
        <form onSubmit={handleSubmit} className='min-h-[70vh] w-full flex flex-col gap-2 p-5   '>











          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Image :
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="file"
              name="image"
              onChange={handleChange}
              required
            />
          </label>












          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Name:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={productData.name}
              required
            />
          </label>











          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Catagory:


            <select name="catagory"
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              id=""
              onChange={handleChange}
              placeholder="Enter you name...."
              value={formData.catagory}
              required>


              {catagoryArray.map((eachCatag, index) => {
                return (<option
                  key={index}
                  value={eachCatag}>
                  {eachCatag}
                </option>)

              })}


            </select>



          </label>
















          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Discription:

            <textarea
              className="min-h-[9vh] max-h-[20vh]  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              name="disc"
              value={formData.disc}
              onChange={handleChange}
              placeholder={productData.disc}
              required
            ></textarea>

          </label>












          <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden ">
            Price:
            <input
              className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-800 rounded-md bg-transparent border border-gray-800 outline-none placeholder-gray-900"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder={productData.price}
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









export default ProductUpdate;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import bgcImg1 from '../assets/images/image12.webp'
import MyContext from "../contextApi/MyContext";
import Loader from "../components/Loader";















const EditUserForm = () => {



    let Navigate = useNavigate()

    let { userInfo,
        setUserInfo
    } = useContext(MyContext)



    const [formData, setFormData] = useState({
        userImage: null,
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        address: "",
    });
















    if (!userInfo || userInfo == "") {

        async function fetchUserData() {

            let response = await axios.get("/api/userRoutes/userInfo")
            if (response.data) {
                // console.log(response.data)
                setUserInfo(response.data.userData)
                setFormData(response.data.userData)
            }


        }

        fetchUserData()

    }




    // useEffect(()=>{
    //     try{
    //         console.log("entered in useeffect of userInfo")
    //       
    //     }catch(err){
    //         console.log("error from getting user data from database in edituserForm", err)
    //     }
    // },[])







    useEffect(() => {
        console.log(formData)
    }, [userInfo, formData])






    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "userImage") {
            setFormData({ ...formData, userImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };










    const handleSubmit = async (e) => {
        e.preventDefault();


        const url = "/api/userRoutes/editUserData";


        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post(url, formDataToSend, { withCredentials: true });
            if (response.data) {
                if (response.data.status == "success") {
                    alert("Successfully Edited!");
                    Navigate("/userProfile")
                }
            } else {
                alert("something went wrong in the registration of user")
            }


        } catch (error) {
            alert("An error occurred while submitting the form.");
            console.error(error);
        }
    };














    return (











        // main div of the component
        <div className=" min-h-[100vh] w-screen  flex justify-center items-center overflow-x-hidden" >








            {/* just for background image */}
            <div
                className=" h-screen w-screen fixed top-0 left-0 bg-cover bc-center z-[-999]"
                style={{ backgroundImage: `url(${bgcImg1})` }}>

            </div>












            {/* Container Div of Seller Registration form */}
            <div className="custom_glassy_effect    min-h-[90vh] w-[90%] sm:w-[600px] flex-col pt-12 sm:pt-7 p-4 sm:p-7  mt-20 rounded-xl sm:rounded-3xl   ">





                {/* heading of seller registration form */}
                <h2 className="mb-4 w-full flex justify-center text-2xl sm:text-3xl font-bold" >User Edit</h2>





                {/* main form of seller registration */}
                <form onSubmit={handleSubmit} className='min-h-[70vh] w-full flex flex-col gap-2 p-5   '>


                    <label className="h-13 w-full pl-1 mb-2 rounded-md  flex flex-col gap-1 text-lg overflow-hidden
           ">
                        Image:
                        <input
                            className="h-10  w-[98%] pr-2 pl-2 font-semibold text-[15px] text-gray-900 flex justify-center rounded-md bg-transparent border border-gray-800 outline-none"
                            type="file"
                            name="userImage"
                            onChange={handleChange}
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










                    <div className="min-h-20 p-3 flex flex-col items-center mt-2 "  >

                        <button
                            className="h-11 w-full bg-yellow-600 text-xl text-zinc-200 rounded-lg flex items-center justify-center mb-3 relative"
                            type="submit">
                            Edit

                            <div className="h-max w-max absolute top-1/2 right-10 sm:right-40 -translate-y-1/2 ">
                                <Loader hw={20} />
                            </div>

                        </button>



                    </div>









                </form>



            </div>




        </div>





    );
};

export default EditUserForm;

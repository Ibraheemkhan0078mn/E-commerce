import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MyContext from '../contextApi/MyContext.jsx'







const MenuPage = () => {



    const Navigate=useNavigate()



    let [sellerData, setSellerData]= useState('')
    let [dataDisplay, setDataDisplay]= useState("hide")
    let [responseMsg, setResponseMsg]= useState("")



    const { setSellerInfo}= useContext(MyContext)

















    async function LogoutSeller(){
        let response= await axios.get("/api/sellerRoutes/Logout",{withCredentials:true})
        // console.log(response.data)
        Navigate("/sellerLogin")
    }



















    function updateSellerInfo(){
        Navigate('/SellerDataUpdateForm')
        
    }





















    function displaySellerData(){
        getSellerData()
        setTimeout(() => {
            if(dataDisplay=="hide"){
                setDataDisplay("show")
            }else{
                setDataDisplay("hide")
            }
        }, 1000);
        
    }



















    useEffect(()=>{
        getSellerData()
    },[])


    async function getSellerData(){
        let response= await axios.get("/api/sellerRoutes/sellerData", {withCredentials:true})
        
        if(!response){
            // console.log("No response is getted from the backend", response)
            setResponseMsg("Something went wrong....")
        }else{
            // console.log(response.data)
            setSellerData(response.data)
            setSellerInfo(response.data)
            setResponseMsg("Data is correctly fetched")
            
            

        }


    }










    




























    


  return (
    <div className='MenuPage'>


        <h4>{responseMsg}</h4>
        <button onClick={displaySellerData}>Seller Information</button>
        <br></br>
        <br></br>
        <button className="updateBtn" onClick={updateSellerInfo}>Update Seller Info</button>

        <div className="sellerInfoPage" style={dataDisplay=="hide"?{display:"none"}:{display:"block"}}>
            <h3>Name: {sellerData.name}  </h3>
            <h3>Email: {sellerData.email} </h3>
            <h3>Cnic No. : {sellerData.cnic} </h3>
            <h3>Phone No. : {sellerData.phoneNo}</h3>
            <h3 >Password: {sellerData.password} </h3>
        </div>

        <br></br>
        <hr></hr>



        <div style={{marginTop:'20px'}}>
            <button onClick={LogoutSeller}>Logout</button>
        </div>


    </div>
  )
}

export default MenuPage
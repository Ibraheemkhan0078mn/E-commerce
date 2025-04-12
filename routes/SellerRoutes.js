import express from 'express'
import SellerModel from '../models/SellerModel.js'
const router= express.Router()
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import pkg from 'cloudinary'
const cloudinary= pkg.v2
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import SellerLoggedInCheck from '../middlewares/SellerLoggedInCheck.js'
import BlockedJwtToken from '../models/BlockedJwtToken.js'








 


cloudinary.config({
    cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
    api_key: '856196912959875',       // Replace with your Cloudinary API key
    api_secret: '_SLgclLAS2L5Qty0DqAPvzmlmvw', // Replace with your Cloudinary API secret
  });





const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Desktop_Daraz_website/upload/seller/profilePic",
        allowed_formats:["jpeg", 'jpg', 'png']
    }
})


const upload= multer({storage})





































router.get("/", (req, res)=>{
    res.send("The seller router is working properly")
})






router.post("/Register",upload.single("sellerImage"),async (req, res)=>{

    try{

        let {name,email, cnic,phoneNo, password} = req.body

        // image ko receive kerne ke liye
        let image= req.file
        // image ke cloudinary url ko recieve kerne ke liye
        let imageUrl;

        if(image){
            imageUrl=image.path;
        }
        // let existingSeller= SellerModel.findOne({email})

        // if(existingSeller){
        //     res.send("already present this seller")
        // }else{
            bcrypt.genSalt(10, (error, salt)=>{
                bcrypt.hash(password, salt, async (error, hash)=>{
                    let createdSeller= await SellerModel.create({
                        imageUrl,
                        name,
                        email, 
                        cnic,
                        phoneNo, 
                        password:hash
                    })

                    const token=  jwt.sign({email:email, cnic:cnic, id:createdSeller._id}, process.env.sellerSecret)
                
                
                    res.cookie("SellerToken", token).send("seller is created and token is also setted")

                })
            })
        // }
    
    }catch(error){
        console.log(error)
    }



    

    

})





















router.post("/Login", async (req,res)=>{

    let {cnic, email, password}=req.body;

    let existingSeller= await SellerModel.findOne({email:email})

    if(!existingSeller){
        return res.send("No Account")
    }else{

        let existingSellerPassword= existingSeller.password
        // console.log(existingSellerPassword)

        bcrypt.compare(password, existingSellerPassword, (err, isMatched)=>{
            if(err){
                return res.send(err, "The error from comparing password in login of seller")
            }
            if(!isMatched){
                return res.send("Password not matched")
            }else{

                let token= jwt.sign({email:existingSeller.email, cnic:existingSeller.cookiescnic, id:existingSeller._id }, process.env.sellerSecret )
                res.cookie('SellerToken', token).send("Success login")
        

            }
        })

       

    }

})

















router.get("/Logout",SellerLoggedInCheck, async (req,res)=>{
    let token = req.cookies.SellerToken
    await BlockedJwtToken.create({
        token:token
    })
    res.clearCookie('SellerToken').json({status:"success", msg:"The seller is successfully logout"})
})

















router.get("/sellerData",SellerLoggedInCheck, async (req,res)=>{

    try{

      res.json({status:"success", msg:"The seller data is fetched successfuly", sellerData:req.seller})

    }catch(error){
        console.log("error from sellerData router from SellerRoutes", error)
    }

    // res.send("Backend code send the response well from'sellerData route")
})

















router.post("/updateSeller",SellerLoggedInCheck, async (req,res)=>{
    let {name,email, cnic,phoneNo, password} = req.body

    let encodedJwtToken= req.cookies.SellerToken
    
    let decodedToken= jwt.verify(encodedJwtToken, 'secretKey')
    
    let existingSeller= await SellerModel.findOne({email:decodedToken.email})

    if(!existingSeller){
        return res.send("error in finding seller in seller model")
       
    }else{
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{

                await SellerModel.findOneAndUpdate({email:decodedToken.email},{
                    name,
                    email,
                    cnic,
                    phoneNo, 
                    password:hash
                })
        
                let updatedSeller= await SellerModel.findOne({email})
        
                let token= jwt.sign({email:updatedSeller.email, cnic:updatedSeller.cnic, id:updatedSeller._id }, 'secretKey' )
                res.cookie('SellerToken', token).send({status:"updated" , updatedSeller:updatedSeller, origin: '/updateSeller'})
        
        
        

            })
        })
        
        

    }

   
})





 

















router.get("/check", SellerLoggedInCheck, (req,res)=>{
    res.send("Successfullly entered in the check")
})





























export default router;
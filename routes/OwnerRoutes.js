import express from 'express'
const router = express.Router()
import OwnerModel from '../models/OwnerModel.js'
import SellerModel from '../models/SellerModel.js'
import ProductModel from '../models/ProductModel.js'
import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import pkg from 'cloudinary'
const cloudinary = pkg.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
dotenv.config()

































cloudinary.config({
    cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
    api_key: '856196912959875',       // Replace with your Cloudinary API key
    api_secret: '_SLgclLAS2L5Qty0DqAPvzmlmvw', // Replace with your Cloudinary API secret
  });





const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'upload/owner/profileImg',
        allowed_formats: ['jpeg', 'jpg', 'png']
    }
})


const upload = multer({ storage })





























router.get("/", (req, res) => {
    res.send("The owner router is working")
})

















router.post("/ownerRegister", upload.single('OwnerImage'), async (req, res) => {

    try {


        const { name, email, password, gstNo, cnic, secretKey } = req.body;
        const image = req.file



        // let existingOwner= await OwnerModel.find()

        // if(existingOwner.length>0){
        //     return res.send("Already registered")
        // }else{



        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                if (!image) {
                    let createdOwner = await OwnerModel.create({
                        name,
                        email,
                        password: hash,
                        gstNo,
                        cnic,
                        secretKey
                    })


                    let token = jwt.sign({ cnic, email, password, secretKey }, process.env.ownerSecretKey)
                    res.cookie("OwnerToken", token).send({ status: 'success', msg: "The owner is created ", createdOwner: createdOwner })


                } else {

                    let imageUrl = image.path
                    let createdOwner = await OwnerModel.create({
                        imageUrl,
                        name,
                        email,
                        password: hash,
                        gstNo,
                        cnic,
                        secretKey
                    })


                    let token = jwt.sign({ cnic, email, password, secretKey }, process.env.ownerSecretKey)
                    res.cookie("OwnerToken", token).send({ status: 'success', msg: "The owner is created ", createdOwner: createdOwner })


                }


            })
        })






        // }


    } catch (error) {
        console.log("\n\nError Comes from /ownerRegister route\n\n", error)
    }


})






















router.post("/ownerLogin", async (req, res) => {
    let { email, cnic, password, secretKey } = req.body

    let existingOwner = await OwnerModel.findOne({ email })

    if (!existingOwner) {
        return res.send({ status: 'failed', origin: "ownerLogin", msg: "Owner is not present" })
    } else {

        let token = jwt.sign({ email, cnic, password, secretKey }, process.env.ownerSecretKey)
        res.cookie("OwnerToken", token).send({ status: "success", origin: "/ownerLogin", msg: "The Owner is logged in and jwt is set in the cookie" })
    }



})

















router.get("/logout", async (req, res) => {
    res.clearCookie("OwnerToken").send({ status: "success", origin: "/logoutOwner", msg: "The owner is successfuly logout" })
})

















router.get("/ownerData", async (req, res) => {
    let jwtToken = req.cookies.OwnerToken

    if (!jwtToken) {
        return res.send({ status: "failed", msg: "The token is not found " })
    }


    let decodedToken = jwt.verify(jwtToken, "secretKey")


    // console.log(decodedToken)
    if (!decodedToken) {
        return res.send({ status: "failed", msg: "The token is not decoded well" })
    }


    let { email } = decodedToken;

    if (!email) {
        return res.send({ status: "failed", msg: "Email is not found in jwt token" })
    }


    let existingOwner = await OwnerModel.findOne({ email: email })

    if (!existingOwner) {
        return res.send({ status: "failed", msg: "no owner is present on this decoded jwt token email" })
    }







    res.send({ status: "success", ownerInfo: existingOwner, msg: "the owner is succesffully send to frontend" })
})















router.post("/ownerDataUpdate",upload.single("OwnerImage") ,async (req,res)=>{
    try{
        const { _id,name, email, password, gstNo, cnic, secretKey } = req.body;
        const id=_id
        const image = req.file


        let existingOwner= await OwnerModel.findOne({_id:id})
        if(!existingOwner){
            return res.json({status:"failed", msg:"The owner is not present on the sended id"})
        }


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                if (!image) {
                    let updatedOwner = await OwnerModel.findOneAndUpdate(
                        {
                            _id:id
                        },
                        {
                        name,
                        email,
                        password: hash,
                        gstNo,
                        cnic,
                        secretKey
                    })


                    let token = jwt.sign({ cnic, email, password, secretKey }, process.env.ownerSecretKey)
                    res.cookie("OwnerToken", token).send({ status: 'success', msg: "The owner is created ", updatedOwner: updatedOwner })


                } else {

                    let imageUrl = image.path
                    let updatedOwner = await OwnerModel.findOneAndUpdate(
                        {
                            _id:id
                        },
                        {
                        imageUrl,
                        name,
                        email,
                        password: hash,
                        gstNo,
                        cnic,
                        secretKey
                    })


                    let token = jwt.sign({ cnic, email, password, secretKey }, "secretKey")
                    res.cookie("OwnerToken", token).send({ status: 'success', msg: "The owner is created ", updatedOwner: updatedOwner })


                }


            })
        })


    }catch(err){
        return res.json({status:"error", msg:"Error from try and catch of /ownerDataUpdate", err})
    }
})













router.get("/getAllSellersData", async (req, res) => {
    let Sellers = await SellerModel.find()
    res.send({ status: "success", SellersArray: Sellers, origin: "/AllSellerDisplay" })
})













router.get("/getAllUsersData", async (req, res) => {
    let Users = await UserModel.find()
    res.send({ status: "success", UserDataArray: Users, origin: "/AllSellerDisplay" })
})
















router.post("/sellerOwnProductDisplay", async (req, res) => {
    let { sellerId } = req.body
    let products = await ProductModel.find({ seller: sellerId })
    res.send({ status: "success", ProductsArray: products, origin: "/sellerOwnProductsDisplay" })
})




















router.post('/sellerOrUserDelete', async (req, res) => {
    try {
        let { id, mode } = req.body

        if(mode && mode=="seller"){
            let existingSeller = await SellerModel.findOne({ _id: id })
            if (!existingSeller) {
                return res.send({ status: "failed", msg: "not seller is found on this id" })
            }
    


            await SellerModel.findOneAndDelete({ _id: id })
           
           
           
            let allSellers = await SellerModel.find()
            res.send({ status: "success", msg: "The seller is deleted", data:allSellers })
    
    
    
        }else if(mode && mode=="user"){
            let existingUser= await UserModel.findOne({_id:id})
            if(!existingUser){
                return res.json({status:"failed",msg:"user is not found on this id"})
            }


            await UserModel.findOneAndDelete({_id:id})

            let existingUserFindingAgain=  await UserModel.findOne({_id:id})
            if(existingUserFindingAgain){
                return res.json({status:"failed",msg:"The user is not successfully deleted. Check it out"})
            }

            let allUsers= await UserModel.find()
            res.json({status:"success", msg:"the user is successfully deleted from database", data:allUsers})

        }

       

    } catch (err) {
        return res.send({ status: "err", msg: "something went wrong in seller deletion from owner side", err })
    }

})















router.post("/productDelete", async (req, res) => {
    let { productId } = req.body
    let existingProduct = await ProductModel.findOne({ _id: productId })
    if (!existingProduct) {
        return res.send({ status: "failed", msg: "no product is fount on this id" })
    } else {
        await ProductModel.findOneAndDelete({ _id: productId })
        res.send({ status: "success", msg: "The Product is deleted" })
    }
})





























export default router;
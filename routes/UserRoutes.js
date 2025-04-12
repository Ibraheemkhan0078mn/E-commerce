import express from 'express'
const router = express.Router()
import multer from 'multer'
import pkg from 'cloudinary'
const cloudinary = pkg.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
import userLoggedInCheck from '../middlewares/userLoggedInCheck.js'
import ProductModel from '../models/ProductModel.js'
import BlockedJwtToken from '../models/BlockedJwtToken.js'

















cloudinary.config({
    cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
    api_key: '856196912959875',       // Replace with your Cloudinary API key
    api_secret: '_SLgclLAS2L5Qty0DqAPvzmlmvw', // Replace with your Cloudinary API secret
  });







const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "upload/user/profile",
        allowed_formats: ["jpeg", 'jpg', 'png']
    }
})


const upload = multer({ storage })








router.get("/", (req, res) => {
    res.send("The user router is working properly")
})












router.post("/Registration", upload.single("userImage"), async (req, res) => {
    try {

        let { name, email, password, phoneNo, address } = req.body
        let image = req.file



        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                if (image) {
                    let imageUrl = image.path

                    let createdUser = await UserModel.create({
                        imageUrl, name, email, phoneNo, address, password: hash
                    })


                    let token = jwt.sign({
                        UserId: createdUser._id,
                        name,
                        email,
                        password: createdUser.password
                    }, process.env.userSecretKey)

                    res.cookie("UserToken", token).send({ status: "success", createdUser })


                } else {
                    let createdUser = await UserModel.create({
                        name, email, phoneNo, address, password: hash
                    })



                    let token = jwt.sign({
                        UserId: createdUser._id,
                        name,
                        email,
                        password: createdUser.password
                    }, "userSecretKey")

                    res.cookie("UserToken", token).send({ status: "success", createdUser })
                }



            })
        })




        // res.send({imageUrl})

    } catch (err) {
        console.log("Error from User registration route", err)
    }
})















router.post("/login", async (req, res) => {
    let { email, password } = req.body

    // console.log(email, password)


    let existingUser = await UserModel.findOne({ email })

    if (!existingUser) {
        res.send({ status: "failed", msg: "no user found on this email so not logged in" })
    } else {



        let result = await bcrypt.compare(password, existingUser.password)

        // console.log(result)

        if (!result) {
            res.send({ msg: "incorrect password", status: 'failed' })
        } else {
            let token = jwt.sign({
                UserId: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                password: existingUser.password
            }, "userSecretKey")

            res.cookie("UserToken", token).send({ existingUser, status: 'success', msg: "User logged-in successfully" })
        }

    }
})















router.get("/logout",userLoggedInCheck, async (req,res)=>{
    let encryptedToken = req.cookies['UserToken'];
    let blokedToken=await BlockedJwtToken.create({
        token:encryptedToken
    })
    res.clearCookie("UserToken").json({status:"success", msg:"The user is succefully logout"})
})




















router.get("/userInfo", userLoggedInCheck, async (req, res) => {


    try {
       

        let userData= req.user;
        // console.log("user data is",userData)
        res.json({status:"success", msg:"The userdata is getted successfully", userData})



    
    } catch (err) {
        console.log("error comes from userLoggedInCheck middleware\n\n\n", err)
    }
}



)























router.post("/editUserData", userLoggedInCheck, upload.single("userImage"), async (req, res) => {
    try {

        let { name, email, password, phoneNo, address } = req.body
        let image = req.file



        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                if (image) {
                    let imageUrl = image.path

                    let updatedUser = await UserModel.findOneAndUpdate({ _id: req.user._id }, {
                        imageUrl,
                        name,
                        email,
                        phoneNo,
                        address,
                        password: hash
                    })


                    let token = jwt.sign({
                        UserId: updatedUser._id,
                        name,
                        email,
                        password: updatedUser.password
                    }, "userSecretKey")

                    res.cookie("UserToken", token).send({ status: "success", updatedUser })





                } else {
                    let updatedUser = await UserModel.findOneAndUpdate({ _id: req.user._id }, {
                        name,
                        email,
                        phoneNo,
                        address,
                        password: hash
                    })



                    let token = jwt.sign({
                        UserId: updatedUser._id,
                        name,
                        email,
                        password: updatedUser.password
                    }, "userSecretKey")

                    res.cookie("UserToken", token).send({ status: "success", updatedUser })
                }



            })
        })




        // res.send({imageUrl})

    } catch (err) {
        console.log("Error from User registration route", err)
    }
})



























export default router;
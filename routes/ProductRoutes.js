import express, { response } from 'express'
import ProductModel from '../models/ProductModel.js'
const router= express.Router()
import jwt from 'jsonwebtoken'
import SellerModel from '../models/SellerModel.js'
import UserModel from '../models/UserModel.js'
import userLoggedInCheck from '../middlewares/userLoggedInCheck.js'
import SellerLoggedInCheck from '../middlewares/SellerLoggedInCheck.js'
import multer from 'multer'
import pkg from 'cloudinary'
const cloudinary = pkg.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'


















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



















router.get("/",(req,res)=>{
    res.send("The product router is working properly")
})














router.post("/createProduct",SellerLoggedInCheck,upload.single("image"), async (req,res)=>{

    let {imageUrl,name,disc,price,catagory}=req.body
    let image= req.file


    if(!image){
        return res.json({status:"failed", msg:"The is not found"})
    }


   
    let createdProduct= await ProductModel.create({
        imageUrl:image?.path,
        name,
        disc,
        price,
        seller:req.seller._id,
        catagory
    })

    res.json({status:"success", msg:"The product is created succcessfully", createdProduct}) 

    }

    
)


















router.post("/updateProduct",SellerLoggedInCheck,upload.single("image"), async (req,res)=>{
    let {name,disc,price, _id, catagory}=req.body
    let imageUrl= req.file?.path

    // console.log(name,disc,price, _id, catagory, imageUrl)
    
    let existingProduct= await ProductModel.findOne({_id:_id})

    if(!existingProduct){
        return res.send({status:'failed', msg:"No product on the _id is found"})
    }else{

        await ProductModel.findOneAndUpdate({_id:_id},{imageUrl:imageUrl, name , disc, price, catagory})

        let updatedProduct= await ProductModel.findOne({_id})
        res.send({updatedProduct, status: "success"})

    }




     

})














// for delete the product
router.post('/deleteProduct',SellerLoggedInCheck, async (req,res)=>{

    let {productId}=req.body
    let deletedProduct= await ProductModel.findOneAndDelete({_id:productId})


      
    console.log(req.seller)
    let sellerId= req.seller._id;
    let sellerRelatedProducts= await ProductModel.find({seller:sellerId})

    if(!sellerRelatedProducts){
        return res.send({status:"failed", msg:"no product is found in seller model"})
    }


    res.send({status:"success", msg:"The product is deleted", sellerRelatedProducts})

    // res.send({status:"success", msg:"The product is deleted"})

})





 








// for sepcific seller products (not all products)
router.get("/getEachSellerProducts",SellerLoggedInCheck, async (req,res)=>{

  
    let sellerId=req.seller._id

    let products= await ProductModel.find({seller:sellerId})
        res.json({status:"success", msg:"The seller data is successfully fetched", products})

})
















router.get("/getAllProduct",async (req,res)=>{
    try{

        let allProducts= await ProductModel.find()



        if(!allProducts && allProducts?.length==0){
            return res.json({status:"failed", msg:"The data is not correctly fetched from database in the backned"})
        }



        res.json({status:"success", msg:"The data is successfully get ", allProducts})




    }catch(err){
        res.json({status:"error", msg:"Comming from /getAllProduct of backend", err})
    }
})













  











// Take 4 product from each catag and send it to frontend
router.post("/fourProductOfEach", async (req,res)=>{

    // console.log("entered in fourProductOfEach")
    let {productCatagArray}= req.body;
    // console.log(productCatagArray)
    let finalProductArray=[]

    // productCatagArray.forEach(async (eachCatag, index)=>{
        for (let eachCatag of productCatagArray){

        let eachCatagFinalArray=[]
        let allProducts= await ProductModel.find({catagory:eachCatag})
        if(!allProducts  &&   allProducts.length==0){
            // return res.json({status:"failed", msg:"No array is found or the array is empty"})
            console.log("no products are found on "+ eachCatag)
        }else{
            allProducts.forEach((eachProduct, index)=>{
                if(eachCatagFinalArray.length<=4){
                    eachCatagFinalArray.push(eachProduct)
                }
            })
        }

       
        // console.log(eachCatagFinalArray)
        finalProductArray.push(eachCatagFinalArray)

    }

// console.log(finalProductArray)
    if(finalProductArray.length==0){
        return res.send({status:"failed", msg:"No product is found on such catagories"})
    }


    res.send({status:"success", finalProductArray  , msg:"successfuly retrieved the product from database"})

})













// Take the random 10 product and send to frontend
router.get("/bestProducts", async (req,res)=>{
    // for temporary, we just send some products but when it is proper work then i change the code for top products
    let products = await ProductModel.aggregate([
        { $sample: { size: 10 } } // Randomly selects 10 products
      ]);
    //   console.log(products);
      res.send({status:"success", msg:"The product is fetched", products})



      })




















      

router.get("/getAddToCartProducts",userLoggedInCheck, async (req,res)=>{
    try{
 
        let loggedInUserId= req.user._id
 
     
     let currentLoggedInUser = await UserModel.findOne({ _id: loggedInUserId }).populate("cart")
     if (!currentLoggedInUser) {
         return res.json({ status: "failed", msg: "The user is not present but the jwt is present" })
     }

     let allCartProducts= currentLoggedInUser.cart
 
 
     res.json({status:"success", msg:"successfuly get all the cart products",allCartProducts })
 
 
 
 }catch(err){
     res.json({status:"err", msg:"error From try and catch of getAllCartData route in userRoutes"})
 }
 })
 
 
 
 
 
















 

router.post("/addToCart", async (req, res) => {
    try {

        // console.log("addtocart entered")
        let { productId } = req.body;
        let jwtToken = req.cookies.UserToken;



        // taking user id from the token start
        let decodedToken = jwt.verify(jwtToken, "userSecretKey")
        if (!decodedToken) {
            return res.json({ status: "failed", msg: "The jwt token is not correct and decoded well" })
        }

        let loggedInUserId = decodedToken.UserId

        let existingUser = await UserModel.findOne({ _id: loggedInUserId })
        if (!existingUser) {
            return res.json({ status: "failed", msg: "The user is not present but the jwt is present" })
        }


        if (existingUser.cart.includes(productId)) {
            return res.json({ status: "present", msg: "The product is already present in the cart of this user" })
        }

        // taking user id from the token end




        // verify that is product is present on productId send from frontend
        let existingProduct = await ProductModel.findOne({ _id: productId })
        if (!existingProduct) {
            return res.json({ status: "failed", msg: "No product is found" })
        }




        // now if user and product is both present then simply push the product id in cart array of product and then save
        await existingUser.cart.push(productId)
        await existingUser.save()






        // finally response is send back to frontend
        res.json({ status: "success", msg: "The product id is pushed in cart of logged in user" })




    } catch (err) {
        console.log(err)
        return res.send({ status: "error", msg: "The error from trycatch of addToCart route in product route", err })
    }
})

















router.post("/removeFromCard",userLoggedInCheck, async (req,res)=>{
    let {productId}= req.body

    if(productId=="" && !productId){
        return res.json({status:"failed", msg:"The product id is not found"})
    }
    
    if(req.user.cart && req.user.cart?.length>0){

        for (let id of req.user.cart){
            if(id.equals(productId)){
                req.user.cart.pull(productId)
                await req.user.save()

                let updatedUser= await UserModel.findOne({_id:req.user._id}).populate("cart")
                return res.json({status:"success", msg:"The id is successfully deleted from cart array", updatedUser})
            }
        }

    }
    


    res.json({status:"failed", msg:"somethings went worng in deleting the product id from the cart array of the user"})


})






















export default router;

import mongoose from "mongoose";



const productSchema= mongoose.Schema({
    imageUrl:{
        type:String
    },
    name:{
        type:String
    },
    disc:{
        type:String
    },
    price:{
        type:Number
    },
    seller:{
        type:String
    }, 
    date:{
        type:Date,
        default:Date.now
    },
    catagory:{
        type:String
    }
})





export default mongoose.model("Product", productSchema)
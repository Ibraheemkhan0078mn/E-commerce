import mongoose, { mongo, Schema } from "mongoose";




const sellerSchema = mongoose.Schema({
    imageUrl:{
        type:String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    cnic: {
        type: String
    },
    phoneNo: {
        type: String
    },
    password: {
        type: String
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }


})






export default mongoose.model("Seller", sellerSchema)
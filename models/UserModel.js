import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    imageUrl: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    address: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})



export default mongoose.model("User", UserSchema)
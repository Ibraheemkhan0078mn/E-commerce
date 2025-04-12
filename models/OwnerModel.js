import mongoose from "mongoose";




const ownerSchema = mongoose.Schema({
    imageUrl:{
        type:String
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
    gstNo: { 
        type: String
     },
    cnic: { 
        type: String
     },
    secretKey: { 
        type: String 
    },
    date: {
        type: Date,
        default: Date.now
    }
})



export default mongoose.model("Owner", ownerSchema)
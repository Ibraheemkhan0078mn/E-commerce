import mongoose from "mongoose";




let blockedJwtSchema= new mongoose.Schema({
    token:{
        type:String
    }
},
{
    timestamps:true
})




export default mongoose.model("blockedToken",blockedJwtSchema)
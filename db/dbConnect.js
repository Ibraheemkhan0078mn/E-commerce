import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()



const dbConnection= async ()=>{
    try{
 
        

        
        await mongoose.connect(`${process.env.MongodbUri}/Ecommerce`)
        .then(()=>{
            console.log("The mongodb is connected")
        }).catch((error)=>{
            console.log("Error in the mongodb connection" + error)
        })

    }catch(error){
        console.log("Error is from dbConnection" + error)
    }
}

 




export default dbConnection
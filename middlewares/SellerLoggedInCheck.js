
import jwt from 'jsonwebtoken'
import SellerModel from '../models/SellerModel.js'
import BlockedJwtToken from '../models/BlockedJwtToken.js'
import dotenv from 'dotenv'
dotenv.config()


 
export default async function SellerLoggedInCheck(req,res,next){ 
    try{

        let token = req.cookies.SellerToken

        if(!token){
           return res.send({status:"not login", origin: "isLoggedIn middleware"})
        }else{
     
            let existingToken= await BlockedJwtToken.findOne({token:token})
    
            if(existingToken){
                return res.json({status:"failed", msg:"The jwt of this seller is blocked"})
            }
    
            let decodedJwt= jwt.verify(token, process.env.sellerSecret)
            let existingSeller= await SellerModel.findOne({email:decodedJwt.email})
            if(!existingSeller){
                return res.send({status:"not login", origin: "isLoggedIn middleware, seller not found in database, maybe deleted by owner or someone"})
            }else{
    
                req.seller=existingSeller
                next()
            }
    
            
        }

    }catch(err){
        return res.json({status:"error", msg:"Error from the sellerlogincheck middleware", err})
    }
  
}
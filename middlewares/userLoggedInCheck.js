import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';
import BlockedJwtToken from '../models/BlockedJwtToken.js';


export default async function userLoggedInCheck(req, res, next) {
    try {

        let encryptedToken = req.cookies['UserToken'];


        let existingBlockedToken= await BlockedJwtToken.findOne({token:encryptedToken})
        if(existingBlockedToken){
            return res.json({status:"failed", msg:"This token is blocked"})
        }


        if (!encryptedToken) {
            res.send({ status: "fialed", msg: "No token found hence not logged in" })
        } else {


            let decodedJwt = jwt.verify(encryptedToken, 'userSecretKey')
            let existingUser = await UserModel.findOne({ email: decodedJwt.email })


            if (!existingUser) {
                res.send({ status: 'failed', msg: "I think your jwt is dummy because no user is present on the basis of your jwt" })
            } else {


                req.user=existingUser
                next()

            }
        }

    } catch (err) {
        console.log("error comes from userLoggedInCheck middleware\n\n\n", err)
    }
}
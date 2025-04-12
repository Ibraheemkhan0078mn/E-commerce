import express from 'express'
const app= express()
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'
import dbConnection from './db/dbConnect.js'
import path from 'path'
import { fileURLToPath } from 'url'

import SellerRoutes from './routes/SellerRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import OwnerRoutes from './routes/OwnerRoutes.js'
import UserRoutes from './routes/UserRoutes.js'






 


let __filename= fileURLToPath(import.meta.url)
let __dirname= path.dirname(__filename)



 

dbConnection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'frontend/dist')))
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React frontend URL
    credentials: true, // Allows cookies to be sent
  })); 




 
 
 
app.get("/check", (req,res)=>{
    res.send({status:"loggedIn", origin:"/"})
})

 
  


  



app.use('/api/sellerRoutes', SellerRoutes)
app.use('/api/productRoutes',ProductRoutes)
app.use("/api/ownerRoutes", OwnerRoutes)
app.use("/api/userRoutes",UserRoutes )
 












app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
  });







const port= process.env.PORT
app.listen(port,()=>{
    console.log("The app is running "+ port)
}) 
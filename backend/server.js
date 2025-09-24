const express =require('express')
const env=require('dotenv').config()
const app=express();
const cors=require('cors')
const connectDB=require('./config/db')
app.use(cors({ origin: true, // replace with your frontend URL
    credentials: true // if you want to send cookies
    }))
     const Router=require('./routes/authRoutes')
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',Router)
// cors

   
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Hey I am fit and healthy and I am listening on PORT ${process.env.PORT}`)
})
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
async function connectDB(){
     const uri=process.env.MONGO_URI
    try{
       
         await mongoose.connect(process.env.MONGO_URI)
            console.log("Database connected successfully")
    }
    catch(err){
        console.log("Error in Db connection",uri)
    }
   


}

module.exports=connectDB
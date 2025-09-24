const mongoose=require('mongoose')
async function connectDB(){
    try{
         await mongoose.connect('mongodb://localhost:27017/userManagement')
            console.log("Database connected successfully")
    }
    catch(err){
        console.log("Error in Db connection",err)
    }
   


}

module.exports=connectDB
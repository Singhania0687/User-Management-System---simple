const mongoose=require('mongoose')
// Define the user schema
const userSchema=new mongoose.Schema({
    fname:{type:String,required:true},
        lname:{type:String,required:true},
        passwd:{type:String,required:true},
            email:{type:String,required:true,unique:true}},{timestamps:true})
            // Create the user model
            const User=mongoose.model('User',userSchema)
            // Export the user model
            module.exports=User
const bcrypt=require('bcryptjs')
const User=require('../models/User')
const jwt=require('jsonwebtoken')

module.exports.signup=async (req,res)=>{
    try{
       const {fname,lname,email,passwd}=req.body

     // First check if user already exists with the given email
     const existingUser=await User.find({email})
     if(existingUser.length>0)
          res.status(400).json({msg:'User already exist with the given email'})
        else{
             // Now hashing the password
        const hashedPassword= await bcrypt.hash(passwd,10)
        // storing the user in db
        const user=new User({
            fname,
            lname,
            email,
            passwd:hashedPassword
        })
       
        await user.save();
        res.status(200).json({msg:'User signed up successfully'})
        }
       
    }
    catch(err){
        res.status(500).json({error :err.message})
    console.log('error in signup controller',err)
}

}

// module.exports.signin=async (req,res)=>{
//     try{
//         const {email,passwd}=req.body
      
//         const isExistingUser=await User.findOne({email})
      
//         if(!isExistingUser)
//             return res.status(400).json({msg:'User not found with the given email'})
//         const isMatch=await bcrypt.compare(passwd,isExistingUser.passwd)
       
//         if(!isMatch)
//             return res.status(400).json({msg:'Incorrect password'})
 
//         // Now the user is validated successfully and I can provide the token to the user along with UI
//       const token=jwt.sign({id:isExistingUser._id},process.env.JWT_SECRET,{expiresIn:'1d'})
//       res.cookie('token',token,{
//         httpOnly:true,
//         maxAge:60*60*24
//       });
//         res.status(200).json({
//   msg: `User signed in successfully  ${Date.now().toLocaleString()}`,
//   token,
//   user: { fname: isExistingUser.fname, lname: isExistingUser.lname, email: isExistingUser.email }
// });

//     }
//     catch(err){
//         res.status(500).json({error:err.message})
//     }

// }
module.exports.signin = async (req, res) => {
  try {
    const { email, passwd } = req.body;

    const isExistingUser = await User.findOne({ email });
    if (!isExistingUser)
      return res.status(400).json({ msg: "User not found with the given email" });

    const isMatch = await bcrypt.compare(passwd, isExistingUser.passwd);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect password" });

    // Generate JWT
    const token = jwt.sign(
      { id: isExistingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token + user details to frontend
    res.status(200).json({
      msg: "User signed in successfully",
      token,
      user: {
        fname: isExistingUser.fname,
        lname: isExistingUser.lname,
        email: isExistingUser.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

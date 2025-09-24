const router=require('express').Router()
const {signup,signin}=require('../controllers/authController')
const { verifyToken } = require("../middleware/authMiddleware");
router.post('/signup',signup)
router.post('/signin',signin)
router.get("/profile", verifyToken, (req, res) => {
  res.json(req.user); // user info added by middleware
});

module.exports=router
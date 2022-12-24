const express=require('express');
const {addUser,confirmation,login} = require("../services/userService");
const router = express.Router();
const {salt}= require("../config/config")

router.post('/login',async (req,res,next)=>{
    login(req,res)
})
router.post("/register", addUser)

router.get('/resetpassword',async (req,res,next)=>{
    //login kodları
})

router.get('/confirmation/:token', confirmation)
module.exports = router
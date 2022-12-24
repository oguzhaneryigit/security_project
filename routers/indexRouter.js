const express=require('express');
const {login} = require("../services/userService");
const router = express.Router();

router.post('/login',async (req,res,next)=>{
    login(req,res)
})
router.post("/register", loginBodyValidator)

router.get('/resetpassword',async (req,res,next)=>{
    //login kodları
})
module.exports = router
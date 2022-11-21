const express=require('express');
const router = express.Router();

const { default: mongoose } = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createError=require("http-errors")
const bcrypt = require("bcrypt");

const User = require("../models/user")
const auth = require('../Middleware/AuthMiddleware');
const adminAuth = require('../Middleware/AdminMiddleware');

// api/users
// HELLLO WORLD
//deneme
router.get('/',[auth,adminAuth],async (req,res,next)=>{
    try{
        let result = await User.find({});
        res.json({
            success:true,
            message:"list of all users",
            data:result
        })
    }catch(e){
        next(e)
    }
})

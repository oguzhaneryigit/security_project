const express=require('express');
const {listAllUsers,addUser} = require("../services/userService");
const router = express.Router();

router.get('/listall',async (req,res,next)=>{
    listAllUsers(req,res)
})
router.post("/add", async (req,res)=>{
    addUser(req,res)
})

module.exports = router
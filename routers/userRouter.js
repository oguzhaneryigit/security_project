const express=require('express');
const router = express.Router();

router.get('/listall',async (req,res,next)=>{
    listAllUsers()
})

module.exports = router
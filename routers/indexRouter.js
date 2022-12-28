const express=require('express');
const {addUser,confirmation,login} = require("../services/userService");
const {loginBodyValidator,RegisterBodyValidator} = require("../middlewares/ValidationMiddlewares");
const {Users}=require("../models/index")
const router = express.Router();
const {salt}= require("../config/config")
const auth=require("../middlewares/AuthMiddleware")
const jwt = require("jsonwebtoken");
router.get("/",(req,res)=> {
    console.log("")
    res.status(200).render("login.ejs")
    
})
router.get("/home",async (req,res)=> {
    try {
        console.log("home")
        let payload = await jwt.verify(req.cookies.token,salt)
        let user = await Users.findOne({where:{username:payload.username}})
        res.status(200).render("account.ejs",{
            username:user.dataValues.username,
            balance:user.dataValues.balance,
            label:"",
            data:[]
        })
    }catch (e) {
        res.status(400)
    }

})

router.post('/login',loginBodyValidator,login)
router.post("/register", RegisterBodyValidator,addUser)
router.get('/confirmation/:token', confirmation)

module.exports = router
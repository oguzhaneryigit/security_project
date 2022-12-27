const express=require('express');
const {addUser,confirmation,login} = require("../services/userService");
const {loginBodyValidator,RegisterBodyValidator} = require("../middlewares/ValidationMiddlewares");

const router = express.Router();
const {salt}= require("../config/config")

router.get("/",(req,res)=> {
    console.log("")
    res.status(200).render("login.ejs")
    
    
    
})
router.get("/home",(req,res)=> {
    console.log("home")
    res.status(200).render("account.ejs")
})

router.post('/login',loginBodyValidator,login)
router.post("/register", RegisterBodyValidator,addUser)
router.get('/confirmation/:token', confirmation)

module.exports = router
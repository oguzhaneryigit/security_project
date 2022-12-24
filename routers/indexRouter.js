const express=require('express');
const {addUser,confirmation,login} = require("../services/userService");
const {loginBodyValidator,RegisterBodyValidator} = require("../middlewares/ValidationMiddlewares");

const router = express.Router();
const {salt}= require("../config/config")

router.post('/login',loginBodyValidator,login)
router.post("/register", RegisterBodyValidator,addUser)
router.get('/confirmation/:token', confirmation)

module.exports = router
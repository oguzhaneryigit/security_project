const express=require('express');
const {listAllUsers,addUser} = require("../services/userService");
const router = express.Router();
const AdminAuthMiddleware = require("../middlewares/AdminAuthMiddleware")
const {loginBodyValidator} = require("../middlewares/ValidationMiddlewares");

router.get('/listall',AdminAuthMiddleware,listAllUsers)
router.post("/add", loginBodyValidator,addUser)
//
module.exports = router
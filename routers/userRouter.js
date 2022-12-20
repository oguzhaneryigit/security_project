const express=require('express');
const {listAllUsers,addUser} = require("../services/userService");
const router = express.Router();
const AdminAuthMiddleware = require("../middlewares/AdminAuthMiddleware")

router.get('/listall',AdminAuthMiddleware,listAllUsers)
router.post("/add", AdminAuthMiddleware,addUser)
//
module.exports = router
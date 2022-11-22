const express=require('express');
const {listAllUsers,addUser} = require("../services/userService");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/listall',AuthMiddleware,listAllUsers)
router.post("/add", addUser)

module.exports = router
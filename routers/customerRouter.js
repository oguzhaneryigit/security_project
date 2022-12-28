const express=require('express');
const {transferMoney,listAllOutgoingTransfers,listAllIncomingTransfers, depositMoney, withdrawMoney} = require("../services/customerService");
const {listTransferValidator,transferValidator,moneyProcessValidator} = require("../middlewares/ValidationMiddlewares");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const jwt = require("jsonwebtoken");
const {salt} = require("../config/config");

router.get('/listalloutgoingtransfers',async (req,res,next)=>{
    try {
        let payload = await jwt.verify(req.cookies.token,salt)
        req.body.username=payload.username
        next()
    }catch (e) {
        res.send(401)
    }
},listTransferValidator,listAllOutgoingTransfers)
router.get('/listallincomingtransfers',async (req,res,next)=>{
    try {
        let payload = await jwt.verify(req.cookies.token,salt)
        req.body.username=payload.username
        next()
    }catch (e) {
        res.send(401)
    }
},listTransferValidator,listAllIncomingTransfers)
router.post("/transfermoney",AuthMiddleware,transferValidator, transferMoney)
router.post("/depositMoney",AuthMiddleware,moneyProcessValidator,depositMoney)
router.post("/withdrawMoney",AuthMiddleware,moneyProcessValidator,withdrawMoney)
//
module.exports = router
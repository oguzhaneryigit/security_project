const express=require('express');
const {transferMoney,listAllOutgoingTransfers,listAllIncomingTransfers, depositMoney, withdrawMoney} = require("../services/customerService");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/listAllOutgoingTransfers',AuthMiddleware,listAllOutgoingTransfers)
router.get('/listAllIncomingTransfers',AuthMiddleware,listAllIncomingTransfers)
router.post("/transfermoney", transferMoney)
router.post("/depositMoney",depositMoney)
router.post("/withdrawMoney",withdrawMoney)
//
module.exports = router
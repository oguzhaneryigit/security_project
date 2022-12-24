const express=require('express');
const {transferMoney,listAllOutgoingTransfers,listAllIncomingTransfers, depositMoney, withdrawMoney} = require("../services/customerService");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.post('/listAllOutgoingTransfers',AuthMiddleware,listAllOutgoingTransfers)
router.post('/listAllIncomingTransfers',AuthMiddleware,listAllIncomingTransfers)
router.post("/transfermoney", transferMoney)
router.post("/depositMoney",depositMoney)
router.post("/withdrawMoney",withdrawMoney)
//
module.exports = router
const express=require('express');
const {transferMoney,listAllOutgoingTransfers,listAllIncomingTransfers, depositMoney, withdrawMoney} = require("../services/customerService");
const {listTransferValidator,transferValidator,moneyProcessValidator} = require("../middlewares/ValidationMiddlewares");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/listalloutgoingtransfers',AuthMiddleware,listTransferValidator,listAllOutgoingTransfers)
router.get('/listallincomingtransfers',AuthMiddleware,listTransferValidator,listAllIncomingTransfers)
router.post("/transfermoney",AuthMiddleware,transferValidator, transferMoney)
router.post("/depositMoney",AuthMiddleware,moneyProcessValidator,depositMoney)
router.post("/withdrawMoney",AuthMiddleware,moneyProcessValidator,withdrawMoney)
//
module.exports = router
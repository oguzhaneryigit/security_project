const express=require('express');
const {transferMoney,listAllOutgoingTransfers,listAllIncomingTransfers} = require("../services/customerService");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/listAllOutgoingTransfers',AuthMiddleware,listAllOutgoingTransfers)
router.get('/listAllIncomingTransfers',AuthMiddleware,listAllIncomingTransfers)
router.post("/transfermoney", transferMoney)
//
module.exports = router
const {Transactions,Customers} = require("../models")
const bcrypt = require("bcrypt")
const {salt,expiresIn,algorithm} = require("../config/config")
const jwt = require("jsonwebtoken")





const transferMoney = async (req, res) => {
    let {sendername,sender,receiver,amount} = req.body
    try{
        let sendercostumer =await Customers.findOne({where:{customername:sendername}})
        if(sendercostumer.dataValues.balance<amount)
            throw Error("insufficient balance to transfer money")
            
         Transactions.create({ sender, receiver,amount})
        .then(result => {
            console.log("Money Transferred ")
            res.status(200).send(result)
        })
    }catch (e) {
        console.log(e)
        res.status(400).send()
    
    }
   
        
}


const listAllIncomingTransfers = async (req, res) => {
    let {customername} = req.body
    let customerId
    try{
        let customer =await Transactions.findOne({where:{receiver:customername}})
        customerId=customer.dataValues.id
        if (customer==null)
            throw Error("customer could not found")

        let result = await Transactions.findAll( {receiver:customername})
        console.log("All Incoming transactions listed")
        res.status(200).send(result)
    }catch (e) {
        console.log(e)
        res.status(400).send()
    }
}
const listAllOutgoingTransfers = async (req, res) => {
    let {customername} = req.body
    let customerId
    try{
        let customer =await Transactions.findOne({where:{sender:customername}})
        customerId=customer.dataValues.id
        if (customer==null)
            throw Error("customer could not found")

        let result = await Transactions.findAll( {sender:customername})
        console.log("All  Outgoing transactions listed")
        res.status(200).send(result)
    }catch (e) {
        console.log(e)
        res.status(400).send()
    }
}




module.exports = {
    transferMoney,
    listAllOutgoingTransfers,
    listAllIncomingTransfers

}
const {Transactions,Customers,Users} = require("../models")
const bcrypt = require("bcrypt")
const {salt,expiresIn,algorithm} = require("../config/config")
const jwt = require("jsonwebtoken")





const transferMoney = async (req, res) => { //todo Test edilecek
    let {sender,receiver,amount} = req.body
    try{
        let sendercostumer = await Users.findOne({where:{username}})
        if(sendercostumer.dataValues.balance<amount)
            throw Error("Insufficient balance to transfer money")
            
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

const listAllIncomingTransfers = async (req, res) => { //todo Test edilecek
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
const listAllOutgoingTransfers = async (req, res) => { //todo Test edilecek
    let {customername} = req.body
    let customerId
    try{
        let customer =await Transactions.findOne({where:{sender:customername}})
        customerId=customer.dataValues.id
        if (customer==null)
            throw Error("customer could not found")

        let result = await Transactions.findAll( {sender:customername})
        console.log("All Outgoing transactions listed")
        res.status(200).send(result)
    }catch (e) {
        console.log(e)
        res.status(400).send()
    }
}
//pora yatir 
const depositMoney = async (req, res) => { //todo Test edilecek
    let {username,amount} = req.body
    let userId
    try{

        let user =await Users.findOne({where:{username}})
        userId=user.dataValues.id
        let userwid =await Users.findOne({where:{userId}})
        if (user==null || userwid==null)
            throw Error("user could not found")
        Users.update({balance:balance+amount},{where:{username}}) 
        .then(result => {
            console.log("Money deposited into your account")
            res.status(200).send(result)
        })
    }catch (e) {
        console.log(e)
        res.status(400).send()
    
    }
        
}
//para cek
const withdrawMoney = async (req, res) => { //todo Test edilecek
    let {username,amount} = req.body
    let userId
    try{
        let user =await Users.findOne({where:{username}})
        userId=user.dataValues.id
        let userwid =await Users.findOne({where:{userId}})
        if (user==null || userwid==null)
            throw Error("user could not found")

        if(user.dataValues.balance<amount)
            throw Error("Insufficient balance to withdraw money")
            
        Users.update({balance:balance-amount},{where:{username}})
        .then(result => {
            console.log("Money withdrawn from your account")
            res.status(200).send(result)
        })
    }catch (e) {
        console.log(e)
        res.status(400).send()
    
    }
   
        
}




module.exports = {
    transferMoney,
    listAllOutgoingTransfers,
    listAllIncomingTransfers,
    depositMoney,
    withdrawMoney

}
const {Transactions,Customers,Users} = require("../models")
const bcrypt = require("bcrypt")
const {salt,expiresIn,algorithm} = require("../config/config")
const jwt = require("jsonwebtoken")

const transferMoney = async (req, res) => { //todo Test edilecek
    let {sender,receiver,amount} = req.body
    try{
        let sendercostumer = await Users.findOne({where:{username:sender}})
        let receivercostumer = await Users.findOne({where:{username:receiver}})
        if (sendercostumer==null ||receivercostumer==null){
            throw Error("Customers(s) could not found")
        }
        if(sendercostumer.balance<amount)
            throw Error("Insufficient balance to transfer money")

        let b1=sendercostumer.balance
        let b2=receivercostumer.balance
        sendercostumer.set({
            balance:b1-amount
        })
        receivercostumer.set({
            balance:b2+amount
        })
        //let result1 = await Users.upddate({balance:b1-amount},{username:sendercostumer.username})
        let result1 = await sendercostumer.save()
        let result2 = await receivercostumer.save()
        let result3 = await Transactions.create({ sender, receiver,amount})

        console.log("Money Transferred ")
        res.status(200).send("money transferred")

    }catch (e) {
        console.log(e)
        res.status(400).send()
    
    }
   
        
}

const listAllIncomingTransfers = async (req, res) => { //todo Test edilecek
    try{
        let {username} = req.body
        let customer =await Users.findOne({where:{username}})
        if (customer==null)
            throw Error("customer could not found")
        // let customerId=customer.dataValues.id

        let result = await Transactions.findAll( {where:{receiver:username}})
        console.log("All Incoming transactions listed")
        res.status(200).send(result)
    }catch (e) {
        console.log(e)
        res.status(400).send()
    }
}
const listAllOutgoingTransfers = async (req, res) => { //todo Test edilecek
    try{
        let {username} = req.body
        let customer =await Users.findOne({where:{username}})
        if (customer==null)
            throw Error("customer could not found")
        // let customerId=customer.dataValues.id

        let result = await Transactions.findAll( {where:{sender:username}})
        console.log("All going transactions listed")
        res.status(200).send(result)
    }catch (e) {
        console.log(e)
        res.status(400).send()
    }
}
//para yatir
const depositMoney = async (req, res) => { //todo Test edilecek
    try{
        let {username,amount} = req.body
        let userId

        let user =await Users.findOne({where:{username}})
        if (user==null)
            throw Error("user could not found")
        b1=user.dataValues.balance
        user.set({
            balance:b1+amount
        })
        await user.save()
        console.log("Money deposited into your account")
        res.status(200).send("Money deposited into your account")

    }catch (e) {
        console.log(e)
        res.status(400).send()
    
    }
        
}
//para cek
const withdrawMoney = async (req, res) => { //todo Test edilecek
    try{
        let {username,amount} = req.body
        let userId

        let user =await Users.findOne({where:{username}})
        if (user==null)
            throw Error("user could not found")
        let b1=user.dataValues.balance
        if(b1<amount){
            throw Error("balance is not enough")
        }
        user.set({
            balance:b1+amount
        })
        await user.save()
        console.log("Money withdrawn from your account")
        res.status(200).send("Money withdrawn from your account")

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
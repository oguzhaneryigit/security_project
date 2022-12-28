const {Transactions,Customers,Users} = require("../models")
const bcrypt = require("bcrypt")
const {salt,expiresIn,algorithm} = require("../config/config")
const jwt = require("jsonwebtoken")

const transferMoney = async (req, res) => { //todo Test edilecek
    let {username,receiver,amount} = req.body
    try{
        amount=parseFloat(amount)
        console.log("transfer")
        let sendercostumer = await Users.findOne({where:{username:username}})
        let receivercostumer = await Users.findOne({where:{username:receiver}})
        if (sendercostumer==null ||receivercostumer==null){
            throw Error("Customers(s) could not found")
        }
        if(sendercostumer.balance<amount)
            throw Error("Insufficient balance to transfer money")

        let b1=parseFloat(sendercostumer.balance)
        let b2=parseFloat(receivercostumer.balance)
        sendercostumer.set({
            balance:b1-amount
        })
        receivercostumer.set({
            balance:b2+amount
        })
        //let result1 = await Users.upddate({balance:b1-amount},{username:sendercostumer.username})
        let result1 = await sendercostumer.save()
        let result2 = await receivercostumer.save()
        let result3 = await Transactions.create({ sender:username, receiver,amount})

        console.log("Money Transferred ")
        // res.status(200).send("money transferred")
        res.render("account.ejs",{
            balance:b1-amount,
            username:sendercostumer.dataValues.username,
            label:"",
            data:[]
        })

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
        // res.status(200).send(result)
        res.render("account.ejs",{
            balance:customer.balance,
            username:customer.dataValues.username,
            label:"incoming",
            data:result
        })
    }catch (e) {
        console.log(e)
        res.status(400).send("error")
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
        // res.status(200).send(result)
        res.render("account.ejs",{
            balance:customer.balance,
            username:customer.dataValues.username,
            label:"outgoing",
            data:result
        })
    }catch (e) {
        console.log(e)
        res.status(400).send("error")
    }
}
//para yatir
const depositMoney = async (req, res) => { //todo Test edilecek
    try{
        let {username,amount} = req.body
        let userId
        amount=parseFloat(amount)

        let user =await Users.findOne({where:{username}})
        if (user==null)
            throw Error("user could not found")
        let b1=parseFloat(user.balance)
        user.set({
            balance:b1+amount
        })
        await user.save()
        console.log("Money deposited into your account")
        // res.status(200).send("Money deposited into your account")
        res.render("account.ejs",{
            balance:b1+amount,
            username:user.dataValues.username,
            label:"",
            data:[]
        })
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
        amount=parseFloat(amount)
        let user =await Users.findOne({where:{username}})
        if (user==null)
            throw Error("user could not found")
        let b1=parseFloat(user.balance)
        if(b1<amount){
            throw Error("balance is not enough")
        }
        user.set({
            balance:b1-amount
        })
        await user.save()
        console.log("Money withdrawn from your account")
        // res.status(200).send("Money withdrawn from your account")
        res.render("account.ejs",{
            balance:b1-amount,
            username:user.dataValues.username,
            label:"",
            data:[]
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
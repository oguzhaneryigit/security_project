const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {salt} = require("../config/config")
const listAllUsers = async (req, res) => {
    Users.findAll()
        .then(result => {
            console.log("users listed")
            res.status(200).send(result)
        })
        .catch(error =>{
            console.log(error)

            res.status(400).send()
        })
}
const addUser = async (req, res) => {
    let {username,password} = req.body

    let hashedPw = await bcrypt.hash(password,salt)
    Users.create({ username, password:hashedPw})
        .then(result => {
            console.log("user added")

            res.status(200).send(result)
        })
        .catch(error =>{
            console.log(error)
            res.status(400).send()
        })
}
const login = async (req,res)=>{
    let {username,password} = req.body
    let hashedpw = await bcrypt.hash(password,salt)
    Users.findOne({ where: { username } }).then(result=>{
        console.log(result)
        user = result.dataValues
        if (user.password==hashedpw){
            res.status(200).send({username,token:"x"})
        }else{
            throw Error()
        }
    }).catch(error=>{
        console.log(error)
        res.status(400).send()
    })
}
module.exports = {
    listAllUsers,
    addUser,
    login
}

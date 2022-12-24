const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {salt,expiresIn,algorithm} = require("../config/config")
const jwt = require("jsonwebtoken")

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
    let {email,username,password} = req.body

    let hashedPw = await bcrypt.hash(password,salt)
    Users.create({email, username, password:hashedPw})
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
    Users.findOne({ where: { username } }).then(async (result)=>{
        console.log(result)
        user = result.dataValues
        if (user.password==hashedpw){
            let token = await jwt.sign({username,admin:user.admin},salt,{algorithm,expiresIn})
            res.status(200).send({username,token})
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

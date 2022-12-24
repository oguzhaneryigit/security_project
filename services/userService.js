const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {salt,expiresIn,algorithm,GMAIL_PASS,GMAIL_USER} = require("../config/config")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
//require('dotenv').config();
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
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS,
        },
      });
    let {email,username,password} = req.body
    let hashedPw = await bcrypt.hash(password,salt)
    const user = Users.create({email, username, password:hashedPw})
        .then(result => {
            console.log("user added")
            
            res.status(200).send(result)
        })
        .catch(error =>{
            console.log(error)
            res.status(400).send()
        })

        jwt.sign(
            {
              user: _.pick(user, 'id'),
            },
            EMAIL_SECRET,
            {
              expiresIn: '1d',
            },
            (err, emailToken) => {
              const url = `http://localhost:3000/confirmation/${emailToken}`;
    
              transporter.sendMail({
                to: args.email,
                subject: 'Confirm Email',
                html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
              });
            },
          );

          return user;
        }
const login = async (req,res)=>{
    let {username,password} = req.body
    let hashedpw = await bcrypt.hash(password,salt)

    Users.findOne({ where: { username } }).then(async (result)=>{
        console.log(result)
        user = result.dataValues
        if(!user.status){
            throw new Error("Please confirm your Email")
        }
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

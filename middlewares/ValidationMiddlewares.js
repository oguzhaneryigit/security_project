const createHttpError = require("http-errors");
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1
};
const usernameConstraints =Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .required()
const amountConstraints=Joi.number().required().min(0)
const credentialWemailScheama = Joi.object({
    username:usernameConstraints,
    password: passwordComplexity(complexityOptions),
    email: Joi.string().email({ tlds: { allow: false } })
})
const credentialScheama = Joi.object({
    username:usernameConstraints,
    password: Joi.string()
})
const listTransferSchema = Joi.object({
    username:usernameConstraints
})
const transferSchema = Joi.object({
    username:usernameConstraints,
    receiver:usernameConstraints,
    amount:amountConstraints
})
const moneyProcessSchema= Joi.object({
    username:usernameConstraints,
    amount:amountConstraints
})

const loginBodyValidator =async (req,res,next)=>{
    try{
        console.log(req.body)
        await credentialScheama.validateAsync(req.body)
        next()
    }catch(e){
        console.log(e)
        res.status(400).send("Not supported data type")
    }
}
const RegisterBodyValidator =async (req,res,next)=>{
    
    try{
        console.log(req.body)
        await credentialWemailScheama.validateAsync(req.body)
        next()
    }catch(e){
        res.status(400).send("Not supported data type")
        console.log(e)
    }
}
const moneyProcessValidator =async (req,res,next)=>{
    try{
        await moneyProcessSchema.validateAsync(req.body)
        next()
    }catch(e){
        res.status(400).send("Not supported data type")
    }
}
const transferValidator =async (req,res,next)=>{
    try{
        await transferSchema.validateAsync(req.body)
        next()
    }catch(e){
        res.status(400).send("Not supported data type")
    }
}
const listTransferValidator =async (req,res,next)=>{
    try{
        await listTransferSchema.validateAsync(req.body)
        next()
    }catch(e){
        res.status(400).send("Not supported data type")
    }
}
module.exports = {
    loginBodyValidator,
    listTransferValidator,
    transferValidator,
    moneyProcessValidator,
    RegisterBodyValidator,
}
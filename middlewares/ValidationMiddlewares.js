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
const credentialScheama = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(8)
        .max(30)
        .required(),

    password: passwordComplexity(complexityOptions)

})

const loginBodyValidator =async (req,res,next)=>{
    try{
        await credentialScheama.validateAsync(req.body)
        next()
    }catch(e){
        res.status(401).send("Not supported data type")
    }
}

module.exports = {
    loginBodyValidator
}
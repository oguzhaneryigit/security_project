const createHttpError = require("http-errors");
const jwt =require("jsonwebtoken")
const {salt} = require("../config/config")
const auth =async (req,res,next)=>{
    try{
        if(!req.header("Authorization")){
            next(createHttpError(400,"you are not authorized"))
        }
        const token=req.header("Authorization").replace("Bearer ","");
        console.log(token);
        const payload = jwt.verify(token,salt)
        req.user=payload.username
        if(req.method=="POST"){
            if(req.user != req.body.username){
                throw Error()
            }
        }
        next()
    }catch(e){
        res.status(401).send("Not authorized")
    }
}

module.exports =auth
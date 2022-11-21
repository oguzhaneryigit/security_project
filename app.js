// imports
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');

// require('./db/dbConnections');
// const ErrorMiddleware =require("./Middleware/ErrorMiddleware.js");
// const userRouter= require("./Routes/userRouter.js")

// constants
const {
    PORT,
    dbName,
    userName,
    password,
    dbOptions
} = require("./utils/config")

// middlewares
const app=express();
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(bodyParser.json())


let models=require("./models")
const f1=async()=>{
    res = await models.Users.findAll()
}
f1()
//todo migration çıkar


//
app.listen(PORT,()=>{
    console.log("application is runing at " ,PORT," port")
})
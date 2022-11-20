// imports
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
require('./db/dbConnections');
const ErrorMiddleware =require("./Middleware/ErrorMiddleware.js");
const userRouter= require("./Routes/userRouter.js")

// constants
const PORT = 3000;

// middlewares
const app=express();
app.use(express.json());
app.use(urlencoded({extended:true}));
//app.use(bodyParser.json())

app.use("/api/users",userRouter);

app.use(ErrorMiddleware);



//
app.listen(PORT,()=>{
    console.log("application is runing at " ,PORT," port")
})
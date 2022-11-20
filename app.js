// imports
const express = require('express');
// const bodyParser = require('body-parser');
// const { urlencoded } = require('express');
// require('./db/dbConnections');
// const ErrorMiddleware =require("./Middleware/ErrorMiddleware.js");
// const userRouter= require("./Routes/userRouter.js")

// constants
const PORT = 3000;

// middlewares
const app=express();
app.use(express.json());
// app.use(urlencoded({extended:true}));
//app.use(bodyParser.json())
let dbOptions={
    port:5432,
    host: 'localhost',
    dialect: 'postgres'
}
let dbName="SecurityProjectDB"
let userName="postgres"
let password="1029"

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbName, userName, password, dbOptions);

const f=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
f()
// app.use("/api/users",userRouter);
//
// app.use(ErrorMiddleware);



//
app.listen(PORT,()=>{
    console.log("application is runing at " ,PORT," port")
})
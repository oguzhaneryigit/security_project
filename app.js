// imports
const https = require("https")
const express = require('express');
const bodyParser = require('body-parser');
const {urlencoded} = require('express');
const Sequelize = require("sequelize")
const fs= require("fs")



//todo Input Validation
//todo SSL Certificate
//todo sql injection kontrolü



// ssl credentials
// let key  = fs.readFileSync('sslcert/key.pem');
// let cert = fs.readFileSync('sslcert/cert.pem');
// let credentials = {key, cert};

// routes
indexRouter = require("./routers/indexRouter")
userRouter = require("./routers/userRouter")
customerRouter=require("./routers/customerRouter")

// constants
const {PORT} = require("./config/config")

// run application
const app = express();
//const httpsServer = https.createServer(credentials, app);
const httpsServer = https.createServer( app);

// middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(bodyParser.json())

// middle end-points
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/customer",customerRouter)


// https port
// httpsServer.listen(PORT);

// http port
app.listen(PORT, () => {
    console.log("application is runing at ", PORT, " port")
})
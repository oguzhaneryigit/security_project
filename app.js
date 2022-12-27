// imports
const https = require("https")
const express = require('express');
const bodyParser = require('body-parser');
const {urlencoded} = require('express');
const Sequelize = require("sequelize")
const fs= require("fs")
const path = require("path");



//todo SSL Certificate


// ssl credentials
// let key  = fs.readFileSync('sslcert/key.pem');
// let cert = fs.readFileSync('sslcert/cert.pem');
// let credentials = {key, cert};

// routes
let indexRouter = require("./routers/indexRouter")
let userRouter = require("./routers/userRouter")
let customerRouter=require("./routers/customerRouter")

// constants
const {PORT} = require("./config/config")

// run application
const app = express();
//const httpsServer = https.createServer(credentials, app);
const httpsServer = https.createServer( app);

//ejs
app.use(express.static("./public")) //istek yapılırken public içerisindeki dosyalara erişimi sağlar
app.set("view engine",'ejs')
app.set('views',path.resolve(__dirname,"./views"))

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
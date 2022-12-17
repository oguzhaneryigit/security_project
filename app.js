// imports
const https = require("https")
const express = require('express');
const bodyParser = require('body-parser');
const {urlencoded} = require('express');
const Sequelize = require("sequelize")

// ssl credentials
// let privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// let certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// let credentials = {key: privateKey, cert: certificate};

// routes
indexRouter = require("./routers/indexRouter")
userRouter = require("./routers/userRouter")

// constants
const {PORT} = require("./config/config")

// run application
const app = express();
// const httpsServer = https.createServer(credentials, app);

// middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(bodyParser.json())

// middle end-points
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/customer",customerRouter)


// https port
// httpsServer.listen(4000);

// http port
app.listen(PORT, () => {
    console.log("application is runing at ", PORT, " port")
})
// imports
const express = require('express');
const bodyParser = require('body-parser');
const {urlencoded} = require('express');
const Sequelize = require("sequelize")
// routes
indexRouter = require("./routers/indexRouter")
userRouter = require("./routers/userRouter")

// constants
const {PORT} = require("./config/config")

// run application
const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(bodyParser.json())

// middle end-points
app.use("/", indexRouter)
app.use("/user", userRouter)


// listen port
app.listen(PORT, () => {
    console.log("application is runing at ", PORT, " port")
})
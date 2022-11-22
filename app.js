// imports
const express = require('express');
const bodyParser = require('body-parser');
const {urlencoded} = require('express');
const Sequelize = require("sequelize")
// routes
indexRouter = require("./routers/indexRouter")
userRouter = require("./routers/userRouter")

// constants
const {PORT} = require("./utils/config")

// run application
const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(bodyParser.json())

// middle end-points
app.use("/", indexRouter)
app.use("/user", userRouter)

const {
    dbName,
    userName,
    password,
    dbOptions
} = require("./utils/config")
const sequelize = new Sequelize(dbName, userName, password, dbOptions);
const auth=async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
auth()
// listen port
app.listen(PORT, () => {
    console.log("application is runing at ", PORT, " port")
})
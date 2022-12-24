'use strict';
const { Sequelize, Model, DataTypes } = require("sequelize");
// constants
const {
    dbName,
    userName,
    password,
    dbOptions
} = require("../../config/config")

const sequelize = new Sequelize(dbName, userName, password, dbOptions);
sequelize.define('Transactions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sender: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
       
        
    },{
        timestamps:true}
);

const f=async ()=>{
    await sequelize.sync({ force: false });
    console.log("The table for the User model was just (re)created!");
}
f()
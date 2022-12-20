const { Sequelize, Model, DataTypes } = require("sequelize");
// constants
const {
    dbName,
    userName,
    password,
    dbOptions
} = require("../../config/config")

const sequelize = new Sequelize(dbName, userName, password, dbOptions);
sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull:false
    },
    balance:{
        type:DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false

    },
    admin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }
},{
    timestamps:true
});


const f=async ()=>{
    await sequelize.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
}
f()
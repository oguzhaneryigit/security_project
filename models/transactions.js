'use strict';
module.exports = (sequelize, DataTypes) => {
    let Transactions = sequelize.define('Transactions', {
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
        timestamps:true
    });
    return Transactions;
};
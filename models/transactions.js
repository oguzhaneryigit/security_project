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
            allowNull:false
            
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull:false
            
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
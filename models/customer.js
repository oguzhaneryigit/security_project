'use strict';
module.exports = (sequelize, DataTypes) => {
    let Customers = sequelize.define('Customers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customername: {
            type: DataTypes.STRING,
            allowNull:false
        },
        customersurname: {
            type: DataTypes.STRING,
            allowNull:false
        },
        //IBAN Number
        Accountname:{
            type:DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        balance:{
            type:DataTypes.INTEGER,
            allowNull:true,
        }
        
    },{
        timestamps:true
    });
    return Customers;
};
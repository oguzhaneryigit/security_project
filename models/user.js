'use strict';
module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
       
        balance:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultvalue:0
        },
        admin:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        }   
    },{
        timestamps:true
    });
    return Users;
};

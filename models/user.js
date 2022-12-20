'use strict';
module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // email:{ //todo
        //     type: DataTypes.STRING,
        //     unique: true,
        //     allowNull:false
        // },
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
    return Users;
};

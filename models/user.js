'use strict';
module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull:false
        }


    },{
        timestamps:false
    });
    return Users;
};

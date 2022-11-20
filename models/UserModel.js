let dbOptions={
    port:5432,
    host: 'localhost',
    dialect: 'postgres'
}
let dbName="SecurityProjectDB"
let userName="postgres"
let password="1029"

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbName, userName, password, dbOptions);

const User = sequelize.define("user", {
    userName: DataTypes.STRING,
    password:DataTypes.STRING,
    email:DataTypes.STRING,

});

(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();
const { DataTypes } = require("sequelize");
const db = require("../data/config");

const Role = db.define("roles",{

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
});




module.exports = Role;

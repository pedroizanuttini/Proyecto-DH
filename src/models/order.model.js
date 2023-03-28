const { DataTypes } = require("sequelize");
const db = require("../data/config");

const Order = db.define("orders",{
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    }
});




module.exports = Order;

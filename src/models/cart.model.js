const { DataTypes } = require("sequelize");
const db = require("../data/config");

const Cart = db.define("cart",{
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    }
});



module.exports = Cart;

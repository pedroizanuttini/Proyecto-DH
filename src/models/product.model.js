const { DataTypes } = require("sequelize");
const db = require("../data/config");

const Product = db.define("products",{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull:false
    },
    price:{
        type: DataTypes.DOUBLE,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
});




module.exports = Product;

const { DataTypes } = require("sequelize");
const db = require("../data/config");

const Product = require('../models/product.model');

const Category = db.define("categories",{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});




module.exports = Category;
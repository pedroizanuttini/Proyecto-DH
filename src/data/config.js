const { Sequelize } = require('sequelize');


const db = new Sequelize('ecommerce', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
});



module.exports = db;


// Relations

const User = require('../models/user.model');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Role = require('../models/role.model');

User.belongsTo(Role);
Product.belongsTo(Category);
Category.hasMany(Product);



// User.associate = (models) => {
//   User.belongsToMany(models.Role,{
//     foreignKey:'roleId',
//     as:"role"
//   })
// }


// Role.hasMany(User);
// User.belongsTo(Role,{
//   foreignKey:'roleId',
//   as:"role"
// })

// Category.hasMany(Product);
// Product.belongsTo(Category,{
//   foreignKey:'categoryId',
//   as:"category"
// })


// User.associate = (models) => {
//   User.belongsTo(models.Role, {
//       foreignKey: 'roleId',
//       as: "role"
//   })
// }

// Role.associate = (models) => {
//   Role.hasMany(models.User);
// }
const { DataTypes } = require("sequelize");
const db = require("../data/config");

const Role = db.define("roles",{

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
});

Role.associate = (models) => {
    Role.hasMany(models.User);
}


module.exports = Role;

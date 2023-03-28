const { DataTypes } = require("sequelize");
const db = require("../data/config");

const User = db.define("users", {

    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remember: {
        type: DataTypes.BOOLEAN,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // role:{
    //     type: DataTypes.STRING,
    //     allowNull:false
    // },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
});


User.associate = (models) => {
    User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: "role"
    })
}

module.exports = User;

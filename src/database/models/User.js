

module.exports =(sequelize, dataTypes) => {
    const alias="User";
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fname: {
            type:dataTypes.STRING,
            allowNull: false
        },
        lname: {
            type:dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: dataTypes.STRING(12),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: false
        },
        
    
        
    }

    let config= {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
    }

    const User =sequelize.define(alias, cols, config);

    User.associate = function (models){
        User.belongsTo(models.Role, {
            as: "role",
            foreignKey:"role_id"
        })
    } 
    

    return User

};
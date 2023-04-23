

module.exports =(sequelize, dataTypes) => {
    const alias="Role";
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type:dataTypes.STRING(30),
            allowNull: false
        },
    }

    let config= {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Role =sequelize.define(alias, cols, config);

    Role.associate = function (models){
        Role.hasMany(models.User, {
            as: "user",
            foreignKey:"role_id"
        })
    }

    return Role

};

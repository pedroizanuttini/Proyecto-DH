

module.exports =(sequelize, dataTypes) => {
    const alias="Category";
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    const Category =sequelize.define(alias, cols, config);

    Category.associate = function (models){
        Category.hasMany(models.Product, {
            as: "category",
            foreignKey:"category_id"
        })
    }

    return Category

};
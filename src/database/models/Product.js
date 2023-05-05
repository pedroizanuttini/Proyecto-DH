

module.exports =(sequelize, dataTypes) => {
    const alias="Product";
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
        discount:{
            type: dataTypes.DECIMAL(1,2),
            allowNull: false
        },
        price:{
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(65535),
            allowNull: false
        },
        
    }

    const config= {
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
    }

    const Product =sequelize.define(alias, cols, config);

    Product.associate = function (models){
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey:"category_id"
        })

        Product.belongsToMany(models.Order, {
            as:"product",
            through: "Order_Product",
            foreignKey: "product_id",
            otherKey:"order_id"
        })

    } 

    return Product
}
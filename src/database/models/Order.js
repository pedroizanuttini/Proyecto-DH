

module.exports =(sequelize, dataTypes) => {
    const alias="Order";
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fname: {
            type:dataTypes.STRING,
            allowNull: false
        },
        address:{
            type: dataTypes.STRING,
            allowNull: false
        },
        lname: {
            type:dataTypes.STRING,
            allowNull:false
        },
        
    }

    let config= {
        timestamps: true,
        createdAt: 'created_at',
        updateAt: 'updated_at',
        deletedAt: false
    }

    const Order =sequelize.define(alias, cols, config);

    Order.associate = function (models){
        Order.belongsTo(models.User, {
            as: "user",
            foreignKey:"user_id"
        })

        Order.belongsToMany(models.Product, {
            as:"product",
            through: "Order_Product",
            foreignKey: "order_id",
            otherKey:"product_id"
        })
    } 

    return Order
}
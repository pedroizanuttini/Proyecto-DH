module.exports =(sequelize, dataTypes) => {
    const alias="Orders_Product";
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        price:{
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        quantity:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
    }

    // products belongsTo Product

    const config= {
        timestamp:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt: false
    }

    const OrderProducts =sequelize.define(alias, cols, config);

    return OrderProducts
}
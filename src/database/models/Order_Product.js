module.exports =(sequelize, dataTypes) => {
    const alias="Order_Product";
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
        discount:{
            type: dataTypes.DECIMAL(1,2),
            allowNull: false
        },
        
    }

    const config= {
        tiemstamp:true,
        createdAt:'created_at',
        updatedAt:'udpdated_at',
        deletedAt: false
    }

    const OrderProducts =sequelize.define(alias, cols, config);

    return OrderProducts
}
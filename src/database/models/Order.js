

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      }

    },
    {
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
  })


    const config= {
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
  }

   
    Order.associate = function (models) {
      Order.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      });
  
      Order.belongsToMany(models.Product, {
        as: 'products',
        through: 'Order_Products',
        foreignKey: 'order_id',
        otherKey: 'product_id'
      });
    };
  
    return Order;
  };
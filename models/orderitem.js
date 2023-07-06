'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.OrderItem.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  OrderItem.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    userId: DataTypes.STRING,
    orderId: DataTypes.STRING,
    productId: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderItems',
  });
  return OrderItem;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    userId: DataTypes.STRING,
    deliveryLocation: DataTypes.STRING,
    totalAmount: DataTypes.FLOAT,
    orderStatus: { type: DataTypes.ENUM('processing', 'cancelled', 'completed'), defaultValue: 'processing' },

  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  });
  return Order;
};
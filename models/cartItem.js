'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {

    static associate(models) {
      models.CartItem.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }

  CartItem.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    userId: { type: DataTypes.STRING, },
    productId: { type: DataTypes.STRING, },
    quantity: { type: DataTypes.INTEGER, },
    price: { type: DataTypes.FLOAT, },
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cartItems'
  });
  return CartItem;

};
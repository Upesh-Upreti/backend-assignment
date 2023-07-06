'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Product.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    title: DataTypes.STRING,
    display: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING,
    imageAlt: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  });
  return Product;
};
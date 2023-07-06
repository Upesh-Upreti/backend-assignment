'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.CartItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
      models.User.hasMany(models.OrderItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  User.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('superAdmin', 'admin', 'user'), defaultValue: 'user' },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
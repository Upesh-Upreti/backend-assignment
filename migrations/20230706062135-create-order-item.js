'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      deliveryLocation: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      orderStatus: {
        type: Sequelize.ENUM('processing', 'cancelled', 'completed'),
        defaultValue: 'processing',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};
'use strict';
const uid = require('../utils/generateUid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [{
      id: await uid(),
      title: 'Ultima Watch Magic',
      description: 'This is the best product.This is the best product.This is the best product.',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0537/6563/6266/products/SoundpeatsWatch1Pro1_1000x1000.png?v=1627465559',
      imageAlt: 'Ultima Watch Magic',
      price: 1300,
      display: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: await uid(),
      title: 'Fan Tech Mouse',
      description: 'This is the best product.This is the best product.This is the best product.',
      imageUrl: 'https://neostore.com.np/assets/uploads/fantech_x11_3.jpg',
      imageAlt: 'fantech mouse',
      price: 1000,
      display: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    )
  },
  async down(queryInterface, Sequelize) {

  }
};

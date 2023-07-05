'use strict';
const uid = require('../utils/generateUid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: await uid(),
      firstName: 'Hari Bahadur',
      lastName: 'Khadka',
      email: 'haribdr@gmail.com',
      password: bcrypt.hashSync('rambdr@123', 10),
      address: 'Teku',
      phoneNumber: '9861584727',
      role: 'superAdmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: await uid(),
      firstName: 'Ram Bahadur',
      lastName: 'Khadka',
      email: 'rambdr@gmail.com',
      password: bcrypt.hashSync('rambdr@123', 10),
      address: 'Teku',
      role: 'user',
      phoneNumber: '9861584727',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {

  }
};

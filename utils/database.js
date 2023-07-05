const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.SCHEMA, process.env.USER, process.env.PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
});

module.exports = sequelize;

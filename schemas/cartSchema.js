const { body } = require('express-validator');

const addToCart = [

    body('quantity')
        .notEmpty()
        .withMessage('Invalid quantity.'),

];

module.exports = { addToCart, };
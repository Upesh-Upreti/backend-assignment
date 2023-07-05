const { body } = require('express-validator');

const createProduct = [

    body('title')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Invalid title.'),

    body('description')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Invalid description.'),

    body('imageUrl')
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage('Invalid image url.'),

    body('imageAlt')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Invalid image alt text.'),

    body('price')
        .notEmpty()
        .withMessage('Invalid price.'),
];




module.exports = { createProduct, };
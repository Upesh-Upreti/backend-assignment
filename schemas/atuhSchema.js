const { body } = require('express-validator');

const signUpSchema = [

    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email.'),

    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters.'),

    body('firstName')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Too short first name.'),

    body('lastName')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Too short last name.'),

    body('phoneNumber')
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage('Invalid phone number.'),

    body('address')
        .notEmpty()
        .withMessage('Too short last name.'),
];

const logInSchema = [

    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email or password.'),

    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Invalid email or password.'),

];

const changePasswordSchema = [

    body('oldPassword')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Invalid password.'),

    body('newPassword')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Invalid password.'),

];

module.exports = { signUpSchema, logInSchema, changePasswordSchema, };
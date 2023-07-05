const router = require('express').Router();
const authController = require('../controllers/auth/');
const validateRequestSchema = require('../middlewares/validateRequestSchema');
const userSchema = require('../schemas/atuhSchema');

router.post('/login', userSchema.logInSchema, validateRequestSchema, authController.postLogin);

router.post('/signup', userSchema.signUpSchema, validateRequestSchema, authController.postCreateUser);

module.exports = router;
const router = require('express').Router();
const authController = require('../controllers/auth/');
const validateRequestSchema = require('../middlewares/validateRequestSchema');
const userSchema = require('../schemas/authSchema');

router.post('/login', userSchema.logInSchema, validateRequestSchema, authController.postLogin);

router.post('/signup', userSchema.signUpSchema, validateRequestSchema, authController.postCreateUser);

module.exports = router;
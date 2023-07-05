const router = require('express').Router();
const authController = require('../controllers/auth/');
const validateRequestSchema = require('../middlewares/validateRequestSchema');
const userSchema = require('../schemas/atuhSchema');

router.post('/login', userSchema.logInSchema, validateRequestSchema, authController.login);

module.exports = router;
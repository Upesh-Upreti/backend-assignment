const router = require('express').Router();
const withAuth = require('../middlewares/withAuth');
const userController = require('../controllers/users');

router.post('/profile', withAuth, userController.getProfile);

module.exports = router;
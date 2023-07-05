const router = require('express').Router();
const withAuth = require('../middlewares/withAuth');
const adminController = require('../controllers/admin');
const withAdmin = require('../middlewares/withAdmin');
const withPagination = require('../middlewares/withPagination');

router.get('/users', withAuth, withAdmin, withPagination, adminController.getAllUsers);
router.get('/users/:id', withAuth, withAdmin, adminController.getUserById);

module.exports = router;
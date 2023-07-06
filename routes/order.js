const router = require('express').Router();
const withAuth = require('../middlewares/withAuth');
const orderController = require('../controllers/order');
const cartSchema = require('../schemas/cartSchema');
const withPagination = require('../middlewares/withPagination');


router.get('/', withAuth, withPagination, orderController.getAllOrders);
router.get('/:id', withAuth, orderController.getOrderById);
router.post('/checkout', withAuth, orderController.placeOrder);

module.exports = router;
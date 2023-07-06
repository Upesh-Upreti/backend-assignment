const router = require('express').Router();
const withAuth = require('../middlewares/withAuth');
const cartController = require('../controllers/cart');
const cartSchema = require('../schemas/cartSchema');
const validateRequestSchema = require('../middlewares/validateRequestSchema');
const withPagination = require('../middlewares/withPagination');


router.get('/', withAuth, withPagination, cartController.getAllCartItem);
router.patch('/:id', withAuth, cartController.updateCartItem);
router.delete('/:id', withAuth, cartController.deleteCartItem);
router.delete('/', withAuth, cartController.clearCart);
router.post('/add/:productId', withAuth, cartSchema.addToCart, validateRequestSchema, cartController.postAddToCart);

module.exports = router;
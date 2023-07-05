const router = require('express').Router();
const withAuth = require('../middlewares/withAuth');
const productController = require('../controllers/products');
const withAdmin = require('../middlewares/withAdmin');
const withPagination = require('../middlewares/withPagination');
const { createProduct } = require('../schemas/productSchema');
const validateRequestSchema = require('../middlewares/validateRequestSchema');


router.get('/', withPagination, productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', withAuth, withAdmin, productController.updateProductById);
router.delete('/:id', withAuth, withAdmin, productController.deleteProdutById);
router.post('/create', withAuth, withAdmin, createProduct, validateRequestSchema, productController.postCreateProduct);

module.exports = router;
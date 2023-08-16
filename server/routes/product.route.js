const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controller');
const auth = require('../middleware/auth');
const { addProductValidator } = require('../middleware/validations');
const formidableMiddleware = require('express-formidable');

router.post('/', auth('createAny', 'product'), addProductValidator, productsControllers.addProduct);
router.route('/product/:id')
.get(productsControllers.getProductById)
.patch(auth('updateAny', 'product'), productsControllers.updateProductById)
.delete(auth('deleteAny', 'product'), productsControllers.deleteProductById);
router.get('/all', productsControllers.allProducts);
router.post('/paginate/all', productsControllers.paginateProducts);

// Uploading Images for products
router.post('/upload', auth('createAny', 'product'), formidableMiddleware(), productsControllers.picUpload);

module.exports = router;
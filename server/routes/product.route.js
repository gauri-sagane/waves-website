const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controller');
const auth = require('../middleware/auth');
const { addProductValidator } = require('../middleware/validations');


router.post('/', auth('createAny', 'product'), addProductValidator, productsControllers.addProduct);
router.route('/product/:id')
.get(productsControllers.getProductById)
.patch(auth('updateAny', 'product'), productsControllers.updateProductById)
.delete(auth('deleteAny', 'product'), productsControllers.deleteProductById);
router.get('/all', productsControllers.allProducts);
router.post('/paginate/all', productsControllers.paginateProducts);

module.exports = router;
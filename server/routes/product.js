const express = require('express');
const productController = require('../controllers/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/brands', productController.getBrands);
router.post('/brand', auth, admin, productController.addBrand);
router.get('/woods', productController.getWoods);
router.post('/wood', auth, admin, productController.addWood);

module.exports = router;

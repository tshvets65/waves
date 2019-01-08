const express = require('express');
const productController = require('../controllers/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/brands', productController.getBrands);
router.post('/brand', auth, admin, productController.addBrand);
router.get('/woods', productController.getWoods);
router.post('/wood', auth, admin, productController.addWood);

router.post('/article',auth, admin, productController.addArticle);

// BY ARRIVAL /articles?sortBy=createdAt&order=desc&limit=4
// BY SELL /articles?sortBy=sold&order=desc&limit=100
router.get('/articles', productController.getArticlesByAttr);

/// /article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
router.get('/articles_by_id', productController.getArticlesByIds);


module.exports = router;

const express = require('express');
const siteController = require('../controllers/site');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/site_data', siteController.getSiteData);
router.post('/site_data', auth, admin, siteController.updateSiteData);

module.exports = router;
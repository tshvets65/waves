const express = require('express');
const formidable = require('express-formidable');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth', auth, userController.auth);
router.get('/logout', auth, userController.logout);
router.post('/uploadimage', auth, admin, formidable(), userController.uploadImage);
router.get('/removeimage', auth, admin, userController.removeImage);
router.post('/addToCart', auth, userController.addToCart);
router.get('/removeFromCart', auth, userController.removeFromCart);
router.post('/successBuy', auth, userController.successBuy);
router.post('/update_profile', auth, userController.updateProfile);
router.post('/reset_user', userController.resetUser);
router.post('/reset_password', userController.resetPassword);
router.get('/confirm/:id', userController.confirmEmail);


module.exports = router;
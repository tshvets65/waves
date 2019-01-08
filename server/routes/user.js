const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/auth', auth, userController.auth);

router.get('/logout', auth, userController.logout);

module.exports = router;
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register a new seller
router.post('/register', authController.register);
// Login a seller
router.post('/login', authController.login);

module.exports = router;

const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const { create } = require('../controllers/signupControllers');

// # Route to CREATE NEW USER / SIGN UP
router.post('/', create);

module.exports = router;

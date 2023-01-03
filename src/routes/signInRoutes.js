const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const { signin } = require('../controllers/signinControllers');

// # Route to Sign In
router.post('/', signin);

module.exports = router;

const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const { signin } = require('../controllers/signInControllers');

// # Route to Sign In
router.post('/', signin);

module.exports = router;

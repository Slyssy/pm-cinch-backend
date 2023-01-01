let express = require('express');

let router = express.Router();

// * IMPORTING CONTROLLERS (Destructuring controller module exports object)
const { register, login } = require('../controllers/authControllers.js');

// * Defining Routes
router.post('/register', register);

router.post('/login', login);

module.exports = router;

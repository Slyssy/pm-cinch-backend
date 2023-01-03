const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const {
  list,
  show,
  update,
  remove,
} = require('../controllers/usersControllers');

// # Route to GET ALL USERS
router.get('/', list);

// # Route to GET USER by id
router.get('/:id', show);

// # Route to UPDATE USER by id
router.put('/:id', update);

// # Route to DELETE USER by id
router.delete('/:id', remove);
module.exports = router;

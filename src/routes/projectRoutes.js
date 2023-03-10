const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const {
  create,
  list,
  show,
  update,
  remove,
} = require('../controllers/projectControllers');

// # Route to CREATE NEW Project
router.post('/', create);

// # Route to GET ALL Projects
router.get('/', list);

// # Route to GET Project by id
router.get('/:id', show);

// # Route to UPDATE Project by id
router.put('/:id', update);

// # Route to DELETE Project by id
router.delete('/:id', remove);
module.exports = router;

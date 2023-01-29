const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const {
  create,
  list,
  show,
  update,
  remove,
} = require('../controllers/changeOrderControllers');

// # Route to CREATE NEW Change Order
router.post('/', create);

// # Route to GET ALL COs for a project
router.get('/:projectID', list);

// # Route to GET CO by id
router.get('/:id', show);

// # Route to UPDATE CO by id
router.put('/:id', update);

// # Route to DELETE CO by id
router.delete('/:id', remove);
module.exports = router;

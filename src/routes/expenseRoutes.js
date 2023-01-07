const express = require('express');
const router = express.Router();

// # Destructuring controller export to set variables...
const {
  create,
  list,
  show,
  update,
  remove,
} = require('../controllers/expenseControllers');

// # Route to CREATE NEW Expense
router.post('/', create);

// # Route to GET ALL Expenses for a project
router.get('/:projectID', list);

// # Route to GET Expense by id
router.get('/:id', show);

// # Route to UPDATE Expense by id
router.put('/:id', update);

// # Route to DELETE Expense by id
router.delete('/:id', remove);
module.exports = router;

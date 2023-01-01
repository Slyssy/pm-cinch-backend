const express = require('express');
const router = express.Router();

//* Importing Controllers
//* Destructuring imported object to give each function it's own variable name.
const {
  getExpenses,
  getExpenseByID,
  postExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseControllers');

router.get('/expenses/:projectID', getExpenses);

router.get('/expense/:id', getExpenseByID);

router.post('/expense', postExpense);

router.put('/expense/:id', updateExpense);

router.delete('/expense/:id', deleteExpense);

module.exports = router;

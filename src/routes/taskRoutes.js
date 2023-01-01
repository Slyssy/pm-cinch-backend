const express = require('express');
const router = express.Router();

//* Importing Controllers
//* Destructuring imported object to give each function it's own variable name.
const {
  getTasks,
  postTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskControllers');

//* Importing checkJWT middleware
const { checkJWT } = require('../middleware/auth');

router.get('/tasks/:projectID', getTasks);

router.post('/task', postTask);

router.put('/task/:id', updateTask);

router.delete('/task/:id', deleteTask);

module.exports = router;

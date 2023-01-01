const express = require('express');
const router = express.Router();

//* Importing Controllers
//* Destructuring imported object to give each function it's own variable name.
const {
  getUsers,
  getUsersByID,
  updateUser,
  deleteUser,
} = require('../controllers/usersControllers.js');

router.get('/users', getUsers);

router.get('/users/:id', getUsersByID);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;

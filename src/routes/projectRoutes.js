const express = require('express');
const router = express.Router();

//* Importing Controllers
//* Destructuring imported object to give each function it's own variable name.
const {
  getProjects,
  getProjectByID,
  postNewProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectControllers');

//* Importing checkJWT middleware
const { checkJWT } = require('../middleware/auth');

router.get('/projects', checkJWT, getProjects);

router.get('/project/:id', checkJWT, getProjectByID);

router.post('/projects', checkJWT, postNewProject);

router.put('/project/:id', checkJWT, updateProject);

router.delete('/project/:id', checkJWT, deleteProject);

module.exports = router;

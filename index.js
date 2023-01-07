// % Imports ..........................................................
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//% Accessing express and set up server variables .....................
const app = express();

//% Check .env file for port variables. If they exist, use those if not, use port 8000.
require('dotenv').config();
const port = process.env.PORT || 8084;

//% Middleware...........................................................
app.use(express.json());

// # Authentication function
function authenticateToken(req, res, next) {
  // ? Get meta information for request
  const authHeader = req.headers.authorization;
  console.log({ auth: req.headers.authorization });

  // ? Store the token in a variable
  const token = authHeader && authHeader.split(' ')[1];
  console.log({ token });

  // ? What if no token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next();
  });
}

// # Use cors to allow for cross page communication
app.use(cors());
app.use(function (req, res, next) {
  //? Website we wish to allow content
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  //? Request methods we will allow
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  //? RType of content we wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  //? Set to true if you need website to include cookies in the request sent to
  //? api (e.g. in case you use sessions).
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

//% Importing Routers....................................................
const organizationRoutes = require('./src/routes/organizationRoutes');
const userRoutes = require('./src/routes/usersRoutes');
const signUpRoutes = require('./src/routes/signUpRoutes');
const signInRoutes = require('./src/routes/signInRoutes');
// const authRoutes = require('./src/routes/authRoutes');
// const commentRoutes = require('./src/routes/commentsRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
// const taskRoutes = require('./src/routes/taskRoutes');
// const timesheetRoutes = require('./src/routes/timesheetRoutes');
// const userRoutes = require('./src/routes/usersRoutes');

//% Using the route variable created above................................
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the PM-Cinch Back End!',
  });
});
app.use('/organizations', organizationRoutes);
app.use('/users', userRoutes);
app.use('/signup', signUpRoutes);
app.use('/signin', signInRoutes);
// app.use(authRoutes);
// // app.use(commentRoutes);
app.use('/expense', authenticateToken, expenseRoutes);
app.use('/projects', authenticateToken, projectRoutes);
// app.use(taskRoutes);
// // app.use(timesheetRoutes);
// app.use(userRoutes);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

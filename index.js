const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8084;

//* Middleware
app.use(express.json());
app.use(express.static('/public'));

//* Importing Routers
const authRoutes = require('./src/routes/authRoutes');
const commentRoutes = require('./src/routes/commentsRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const timesheetRoutes = require('./src/routes/timesheetRoutes');
const userRoutes = require('./src/routes/usersRoutes');

// * Using the route variable I created above.
app.use(authRoutes);
// app.use(commentRoutes);
app.use(expenseRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
// app.use(timesheetRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

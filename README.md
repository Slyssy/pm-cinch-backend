# pm-cinch

## Tables

[✓] Users Table

[✓] Projects Table

[✓] Expenses Table

[✓] Tasks Table

[✓] Timesheets Table

[✓] Comments Table

![erd diagram](https://raw.githubusercontent.com/Slyssy/pm-cinch/main/public/ERD.png)

## Routes

### Authorization Routes

[✓] <Register style="font-weight: 500;font-size: 16px">Register Route <span style="color:purple; font-size: 16px">POST(/register)</span>

- The request will include the first name, last name, position, email, phone,
  payRate, username, password and userID.
- We will use Argon2 to hash the password.
- This route will post into the users table.
- Include a conditional that will check for duplicates (no duplicates allowed).

[✓] <span style="font-weight: 500;font-size: 16px">Login Route <span style="color:purple; font-size: 16px">POST(/login)</span>

- The request for this route will include the username and password.
- Query the database and grab the id, first name, last name, email and the
  hashed password.
- User Argon2 (verify) to compare the hashed password in the users table to
  the password that was entered.
- If the password passes, create a token and sign it using the JSON Web Token
  package.
  <br>
  <br>

## User Routes

[✓] <span style="font-weight: 500;font-size: 16px">Get All Users</span> <span
style="color:green; font-size: 16px">GET(/users)</span>

<!-- TODO: Need to figure out how to make it so only those users that are logged in can have access to all the users' information. -->

- This is an unprotected route.

- Queries the "users" table and returns the id, first name, last name, position
  of all the users.

[✓] <span style="font-weight: 500;font-size: 16px">Get a User by ID</span> <span
style="color:green; font-size: 16px">GET(/user/:id)</span>

<!-- TODO: Need to make this route accessible to only users that are logged in, but I need any user with the "Authorization Level" to be able to search for a particular user. -->

- This is an unprotected route.
- This route queries the "users" table, and it returns the id, first name, last
  name, position, email, phone, pay_rate, username and password hash for a
  particular user.

[✓] <span style="font-weight: 500;font-size: 16px">Update a User by ID</span> <span style="color:blue; font-size: 16px">PUT(/user/:id)

<!-- TODO: Need to make it so that only the logged in user can update their own route. -->

- This route makes it possible to update any field in a user's record.
- Once updated, this route returns an object of the updated user record.

[✓] <span style="font-weight: 500;font-size: 16px">Delete a User by ID</span>
<span style="color:red; font-size: 16px">DELETE(/user/:id)</span>

<!-- TODO: Need to figure out how only admin level employees can delete user records. -->

- This route deletes a record by a user ID.
- This route will send back a status of ok and confirms the number of records
  that have been deleted.
  <br>
  <br>

## Project Routes

[✓] <span style="font-weight: 500;font-size: 16px">Create a New Project: </span><span style="color:purple; font-size: 16px">POST(/project)</span>

- This route is used to create new projects.
- We will use the token to add the user that is currently logged in to the
  "user_id" field of the projects table.
- The token is generated after the successfully execute the login route.
- If a user is not logged in, then a project cannot be created.

[✓] <span style="font-weight: 500;font-size: 16px">Get All of the Projects
</span><span style="color:green; font-size: 16px">GET(/projects)</span>

- This route is protected with JSON web token.
- User will need to have the correct token to GET projects associated to them.
- The token is generated after the successfully execute the login route.
- Their user id is captured from the signed JSON web token.

[✓] <span style="font-weight: 500;font-size: 16px">Get a Project by ID
</span><span style="color:green; font-size: 16px">GET(/project/:id)</span>

- This route is protected using JSON web token.
- Once a user is logged in, they can only GET projects that contain their user
  id.
- Their user id is captured from the signed JSON web token.

[✓] <span style="font-weight: 500;font-size: 16px">Update a Project by ID
</span><span style="color:blue; font-size: 16px">PUT(/project/:id)</span>

- This route is protected using JSON web token.
- Once a user is logged in, they can only UPDATE projects that contain their user
  id.
- Their user id is captured from the signed JSON web token.

[✓] <span style="font-weight: 500;font-size: 16px">Delete a Project by ID
</span><span style="color:red; font-size: 16px">DELETE(/project/:id)</span>

- This route is protected using JSON web token.
- Once a user is logged in, they can only DELETE projects that contain their user
  id.
- Their user id is captured from the signed JSON web token.
  <br>
  <br>

## Expense Routes

[✓] <span style="font-weight: 500;font-size: 16px">Create a New Expense: </span><span style="color:purple; font-size: 16px">POST(/expense)</span>

- We use this route to create new expenses.
- The expenses are entered via the req.body.
- Currently, the expense table includes the project id, expense date, expense
  type, vendor name and expense amount.

[✓] <span style="font-weight: 500;font-size: 16px">Get All of the Expenses for a
Project</span><span style="color:green; font-size: 16px">GET(/expenses/:projectID)</span>

- This route will GET all the expenses from the expense table that are
  associated with this project.

- This is done by joining the projects table and the expense table.

- The route parameter for this route is the project ID

[✓] <span style="font-weight: 500;font-size: 16px">Get an Expense by ID </span><span style="color:green; font-size: 16px">GET(/expense/:id)</span>

- This route will GET a single expense by its unique id.
- The expense id is the route parameter.

[✓] <span style="font-weight: 500;font-size: 16px">Update an Expense by ID </span><span style="color:blue; font-size: 16px">PUT(/expense/:id)</span>

- This route is used to UPDATE any of the fields in the expenses table for an
  expense selected by the expense id.
- The expense id is entered as a route parameter.

[✓] <span style="font-weight: 500;font-size: 16px">Delete an Expense by ID
</span><span style="color:red; font-size: 16px">DELETE(/expense/:id)</span>

- This route is used to DELETE a single expense by the expense id.
- The expense id is entered as a route parameter.
  <br>
  <br>

## Task Routes

[✓] <span style="font-weight: 500;font-size: 16px">Create a New Task:
</span><span style="color:purple; font-size: 16px">POST(/task)</span>

- We use this route to create new task.
- The tasks are entered via the req.body.
- Currently, the tasks table includes the user id, project id, task title, task
  description, task status, task start date, task end date and column to
  indicate if the task is complete.

[✓] <span style="font-weight: 500;font-size: 16px">Get All of the Tasks for a
Project</span><span style="color:green; font-size:
16px">GET(/tasks/:project_id)</span>

- This route will GET all the tasks from the tasks table that are
  associated with a project.

- This is done by joining the projects table and the tasks table.

- The route parameter for this route is the project ID

[✓] <span style="font-weight: 500;font-size: 16px">Update a Task by ID </span><span style="color:blue; font-size: 16px">PUT(/task/:id)</span>

- This route is used to UPDATE any of the fields in the tasks table for an
  task selected by the task id.
- The task id is entered as a route parameter.

[✓] <span style="font-weight: 500;font-size: 16px">Delete a Task by ID
</span><span style="color:red; font-size: 16px">DELETE(/task/:id)</span>

- This route is used to DELETE any of the fields in the tasks table for an
  task selected by the task id.
- The task id is entered as a route parameter.
  <br>
  <br>

## Time Sheet Routes

[] <span style="font-weight: 500;font-size: 16px">Create a New Time Sheet Entry: </span><span style="color:purple; font-size: 16px">POST(/timesheet)</span>

[] <span style="font-weight: 500;font-size: 16px">Get All of the Time Sheet Entries </span><span style="color:green; font-size: 16px">GET(/timesheets)</span>

[] <span style="font-weight: 500;font-size: 16px">Get a Time Sheet Entry by ID </span><span style="color:green; font-size: 16px">GET(/timesheet/:id)</span>

[] <span style="font-weight: 500;font-size: 16px">Update a Time Sheet Entry by ID </span><span style="color:blue; font-size: 16px">PUT(/timesheet/:id)</span>

[] <span style="font-weight: 500;font-size: 16px">Delete a Time Sheet Entry by ID </span><span style="color:red; font-size: 16px">DELETE(/timesheet/:id)</span>
<br>
<br>

## Comments Routes

[] <span style="font-weight: 500;font-size: 16px">Create a New Comment: </span><span style="color:purple; font-size: 16px">POST(/comment)</span>

[] <span style="font-weight: 500;font-size: 16px">Get All of the Comments </span><span style="color:green; font-size: 16px">GET(/comments)</span>

[] <span style="font-weight: 500;font-size: 16px">Get a Comment by ID </span><span style="color:green; font-size: 16px">GET(/comment/:id)</span>

[] <span style="font-weight: 500;font-size: 16px">Update a Comment by ID </span><span style="color:blue; font-size: 16px">PUT(/comment/:id)</span>

[] <span style="font-weight: 500;font-size: 16px">Delete a Comment by ID </span><span style="color:red; font-size: 16px">DELETE(/comment/:id)</span>
<br>
<br>

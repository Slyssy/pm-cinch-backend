const db = require('../utils/db');

// % Get All Tasks by project_id Controller --------------------------------------------------------------------------------
// * Creating a getTasks controller function that will accept a request and a
// *  response object. It will return all the tasks for a particular project
// *  with the fields defined. It will only show the projects associated with
// *  the user that is logged in.
const getTasks = (req, res) => {
  const projectID = req.params.projectID;

  if (!projectID) {
    res.sendStatus(400);
    return;
  }

  //* Setting token for user_id to a variable.
  // let tokenUserID = req.userInfo.userID;

  // console.log(tokenUserID);

  const sql = `SELECT tasks.id, tasks.user_id, project_id, task_title, task_description, task_status, task_start, task_end FROM tasks JOIN projects ON tasks.project_id = projects.id WHERE tasks.project_id = ?;`;

  const params = [projectID];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The getTasks route failed: ${err}`);
      res.sendStatus(500);
    } else {
      if (rows.length === 0) {
        res.json(null);
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  });
};

// % Create Task Controller --------------------------------------------------------------------------------
// * This function accepts a request and a response.

// * The task id will be auto generated as per the mySQL schema.

// # We will be inserting the tokenUserID into the table by using the
// # tokenUserID that is part of the request object.

// * Once the item is created we want to send a response that shows the new
// * object.
const postTask = (req, res) => {
  const sql =
    'INSERT INTO tasks (user_id, project_id, task_title, task_description, task_status, task_start, task_end, complete)VALUES(?, ?, ?, ?, ?, ?, ?, ?);';
  const params = [
    req.body.userID,
    req.body.projectID,
    req.body.taskTitle,
    req.body.taskDescription,
    req.body.taskStatus,
    req.body.taskStart,
    req.body.taskEnd,
    req.body.taskComplete,
  ];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The postTask route failed: ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Task Created: ${rows}`);
      const resSql =
        'SELECT id, user_id, project_id, task_title, task_description, task_status, task_start, task_end FROM tasks where id = ?';
      const params = [rows.insertId];
      db.query(resSql, params, (err, rows) => {
        if (err) {
          console.log(`The postTask response query failed: ${err}`);
          res.sendStatus(500);
        } else {
          if (rows.length > 1) {
            console.log(
              `Something went wrong. More than one row was returned for expense_id selected`
            );
            res.sendStatus(500);
          } else if (rows.length === 0) {
            res.json(null);
          } else {
            res.json(rows[0]);
          }
        }
      });
    }
  });
};

// % Update Task By ID Controller --------------------------------------------------------------------------------
// * This function will take the request and response objects and it will
// * "update" a single task based on the path parameter submitted with the
// * request.

// # Only tasks associated with the "user" that is logged in can be updated.

// * If the id is not valid, the response will be "null", else the we will run
// * the update query using parameterized SQL Statements.
const updateTask = (req, res) => {
  const taskID = req.params.id;

  if (!taskID) {
    res.sendStatus(400);
    return;
  }

  const sql = `UPDATE tasks SET ? WHERE id = ?`;
  db.query(sql, [req.body, taskID], (err, rows) => {
    if (err) {
      console.log(`The updateTask route was not successful: ${err}`);
      res.sendStatus(500);
    } else {
      // * Running another query that makes use of the task ID to show the
      // *  updated response object.
      const resSqlQuery = `select id, user_id, project_id, task_title, task_description, task_status, task_start, task_end from tasks where id = ?`;
      // # Saving params array as a variable.
      const resParams = [taskID];
      db.query(resSqlQuery, resParams, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "getTaskByID" query failed: ${err}`);
          res.sendStatus(500); // # Sending 500 because error was due to a problem  with the backend.
        } else {
          // * If else statement to handle possible responses.
          // # If greater than 1 row returned...
          if (rows.length > 1) {
            console.log(
              'Something went wrong. More than 1 row was returned for id:',
              userID
            );
            res.sendStatus(500); //# Sending 500 because there is something wrong with the backend.
          }
          // # If no rows returned we will send back null to the client. Request is good, but there are no matching records.
          else if (rows.length === 0) {
            res.json(null);
          }
          // # Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
          else {
            res.json(rows[0]);
          }
        }
      });
    }
  });
};

// % Delete Task By ID Controller --------------------------------------------------------------------------------
// * This function will delete a task based on the client's request.

// * We will use the path parameter to confirm the user that needs to be
// * deleted.

// # Only records associated with the "user" that is logged in can be deleted.

// * We will send the response with the number of rows deleted.

const deleteTask = (req, res) => {
  const taskID = req.params.id;

  if (!taskID) {
    res.sendStatus(400);
    return;
  }

  const sql = `DELETE FROM tasks WHERE id = ?`;
  const params = [taskID];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The deleteTask route failed: ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Number of records deleted: ${rows.affectedRows}`);
      res.json(rows.affectedRows);
    }
  });
};

//* Exporting route functions
module.exports = {
  getTasks,
  postTask,
  updateTask,
  deleteTask,
};

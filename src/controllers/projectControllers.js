const db = require('../utils/db');

// % Get All Projects Controller --------------------------------------------------------------------------------
// * Creating a getProjects controller function that will accept a request and a
// *  response object. It will return all the projects with the fields defined
// *   by the query.
// # It will only show the projects associated with the user that is logged in.
const getProjects = (req, res) => {
  //* Setting token for user_id to a variable.
  let tokenUserID = req.userInfo.userID;

  // * Creating a variable that stores the value of the SQL query for this
  // *  getProjects route's call back function.
  //    # Getting ID, project_name, street_2, city, state, project_status, project_margin, original_revenue, adjusted_revenue, estimated_start_date,estimated_complete_date, & user_id from the projects table for the user that is logged in.
  const sqlQuery =
    'select id, project_name, street_1, street_2, city, state, project_status, project_margin, original_revenue, adjusted_revenue, estimated_start_date,estimated_complete_date, user_id from projects where user_id = ?';

  //* Setting param for user_id so only projects with the correct user_id will
  //*  be displayed.
  let params = [tokenUserID];

  db.query(sqlQuery, params, (err, rows) => {
    // * If there is an error, we want to send an error code and log the error.
    if (err) {
      console.log(`The "getUsers" query failed: ${err}`);
      res.sendStatus(500); // # Sending 500 because error was due to a problem  with the backend.
    } else {
      // * if no error, we want to send the data from the query.
      res.json(rows);
    }
  });
};

// % Get Project By ID Controller --------------------------------------------------------------------------------
// * This function will take the request and response object and it will return
// *  a project based on the id that provided by a path parameter submitted
// *  with the request.

// * If the id is not valid, the response will be "null", else the entire
// * project will be returned in the response.
const getProjectByID = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the client's input.
  const projectID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the client is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!projectID) {
    res.sendStatus(400);
    return;
  }
  //* Setting token for user_id to a variable.
  let tokenUserID = req.userInfo.userID;

  // * Storing the SQL query to a variable. This query will return everything
  // * from this record associated with the user that's logged in.
  // # Using parameterized SQL statements.
  const sqlQuery = `select * from projects where id = ? AND user_id = ?`;
  // # Saving params array as a variable.
  const params = [projectID, tokenUserID];

  db.query(sqlQuery, params, (err, rows) => {
    // * If there is an error, we want to send an error code and log the error.
    if (err) {
      console.log(`The "getProjectsByID" query failed: ${err}`);
      res.sendStatus(500); // * Sending 500 because error was due to a problem  with the backend.
    } else {
      // * If else statement to handle possible responses.
      // * If greater than 1 row returned...
      if (rows.length > 1) {
        console.log(
          'Something went wrong. More than 1 row was returned for id:',
          projectID
        );
        res.sendStatus(500); //* Sending 500 because there is something wrong with the backend.
      }
      // * If no rows returned we will send back a message to the client. Request is good, but there are no matching records.
      else if (rows.length === 0) {
        res.json('Project ID not Found 😢');
      }
      // * Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
      else {
        res.json(rows[0]);
      }
    }
  });
};

// % Create New Project Controller --------------------------------------------------------------------------------
// * This function accepts a request and a response.

// * The user id will be auto generated as per the mySQL schema.

// # We will be inserting the tokenUserID into the table by using the
// # tokenUserID that is part of the request object.

// * Once the item is created we want to send a response that shows the new
// * object.
const postNewProject = (req, res) => {
  //* Setting token for user_id to a variable.
  let tokenUserID = req.userInfo.userID;

  // # Using parameterized SQL statements.
  const sqlQuery =
    'insert into projects (user_id, project_name, street_1, street_2, city, state, zip, project_status, project_margin, original_revenue, adjusted_revenue, budgeted_material_expense, budgeted_labor_expense, budgeted_subcontractor_expense, budgeted_miscellaneous_expense, adjusted_material_expense, adjusted_labor_expense, adjusted_subcontractor_expense, adjusted_miscellaneous_expense, actual_material_expense, actual_labor_expense, actual_subcontractor_expense, actual_miscellaneous_expense, estimated_start_date, estimated_complete_date, actual_start_date, actual_complete_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // * Saving params array as a variable. Each "?" above will be replaced in
  // * order by the items indicated in the array.
  //   # Using the tokenUserID in the params so that we can capture the user_id via the query.
  const params = [
    tokenUserID,
    req.body.projectName,
    req.body.street1,
    req.body.street2,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.projectStatus,
    req.body.projectMargin,
    req.body.originalRevenue,
    req.body.adjustedRevenue,
    req.body.budgetedMaterialExpense,
    req.body.budgetedLaborExpense,
    req.body.budgetedSubcontractorExpense,
    req.body.budgetedMiscellaneousExpense,
    req.body.adjustedMaterialExpense,
    req.body.adjustedLaborExpense,
    req.body.adjustedSubcontractorExpense,
    req.body.adjustedMiscellaneousExpense,
    req.body.actualMaterialExpense,
    req.body.actualLaborExpense,
    req.body.actualSubcontractorExpense,
    req.body.actualMiscellaneousExpense,
    req.body.ESD,
    req.body.ECD,
    req.body.ASD,
    req.body.ACD,
  ];

  db.query(sqlQuery, params, (err, rows) => {
    if (err) {
      console.log('The postNewProject route failed', err);
      res.sendStatus(500); // * Sending 500 because error likely will originate from the backend.
    } else {
      console.log('Project Created: ', rows);
      const resSqlQuery = `select * from projects where id = ?`;
      const params = [rows.insertId];
      // * Running another query to return the entire object of the newly
      // * created user.
      db.query(resSqlQuery, params, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "create new user response" query failed: ${err}`);
          res.sendStatus(500); // * Sending 500 because error was due to a problem  with the backend.
        } else {
          // * If else statement to handle possible responses.
          // * If greater than 1 row returned...
          if (rows.length > 1) {
            console.log(
              'Something went wrong. More than 1 row was returned for id:',
              userID
            );
            res.sendStatus(500); //* Sending 500 because there is something wrong with the backend.
          }
          // * If no rows returned we will send back null to the client. Request is good, but there are no matching records.
          else if (rows.length === 0) {
            res.json(null);
          }
          // * Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
          else {
            res.json(rows[0]);
          }
        }
      });
    }
  });
};

// % Update User By ID Controller --------------------------------------------------------------------------------
// * This function will take the request and response objects and it will
// * "update" a single project based on the path parameter submitted with the
// * request.

// # Only projects associated with the "user" that is logged in can be updated.

// * If the id is not valid, the response will be "null", else the we will run
// * the update query using parameterized SQL Statements.
const updateProject = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const projectID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!projectID) {
    console.log(`No project ID was indicated.`);
    res.sendStatus(400);
    return;
  }
  // TODO: This works. It doesn't update if the correct user token is not used,
  // TODO: but it should say that the update did not work. How?
  //* Setting token for user_id to a variable.
  let tokenUserID = req.userInfo.userID;

  // * Storing the SQL query to a variable.
  // # Using parameterized SQL statements.
  const sqlQuery = 'UPDATE projects SET ? WHERE id = ? AND user_id = ?';
  // * Running the query using the req.body as a parameterized query.
  db.query(sqlQuery, [req.body, projectID, tokenUserID], (err, rows) => {
    if (err) {
      console.log(`The updateUser route was not successful: ${err}`);
      res.sendStatus(500); // * Sending 500 because error likely will originate from the backend.
    } else {
      // * Running another query that makes use of the user ID to show the
      // *  updated response object.
      const resSqlQuery = `select * from projects where id = ?`;
      // * Saving params array as a variable.
      const resParams = [projectID];
      db.query(resSqlQuery, resParams, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "getUsersByID" query failed: ${err}`);
          res.sendStatus(500); // * Sending 500 because error was due to a problem  with the backend.
        } else {
          // * If else statement to handle possible responses.
          // * If greater than 1 row returned...
          if (rows.length > 1) {
            console.log(
              'Something went wrong. More than 1 row was returned for id:',
              projectID
            );
            res.sendStatus(500); //* Sending 500 because there is something wrong with the backend.
          }
          // * If no rows returned we will send back null to the client. Request is good, but there are no matching records.
          else if (rows.length === 0) {
            res.json(null);
          }
          // * Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
          else {
            res.json(rows[0]);
          }
        }
      });
    }
  });
};

// % Delete Project By ID Controller --------------------------------------------------------------------------------
// * This function will delete a user based on the client's request.

// * We will use the path parameter to confirm the user that needs to be
// * deleted.

// # Only records associated with the "user" that is logged in can be deleted.

// * We will send the response with the number of rows deleted.

const deleteProject = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const projectID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!projectID) {
    res.sendStatus(400);
    return;
  }

  //* Setting token for user_id to a variable.
  let tokenUserID = req.userInfo.userID;
  // * Storing the SQL query to a variable.
  // # Using parameterized SQL statements.
  const sqlQuery = 'DELETE FROM projects WHERE id = ? AND user_id = ?';
  const params = [projectID, tokenUserID];

  db.query(sqlQuery, params, (err, rows) => {
    if (err) {
      console.log('The deleteUser route failed', err);
      res.sendStatus(500); // # Sending 500 because error likely will originate from the backend.
    } else {
      console.log(`Number of records deleted: ${rows.affectedRows}`);
      // * If less than one rows is affected we send a message stating that no
      // * records were deleted.
      if (rows.affectedRows < 1) {
        res.json('Record was not deleted.');
      } else {
        res.json(`${rows.affectedRows} record was deleted.`);
      }
    }
  });
};

//* Exporting route functions
module.exports = {
  getProjects,
  getProjectByID,
  postNewProject,
  updateProject,
  deleteProject,
};

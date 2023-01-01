const db = require('../utils/db');

// % Get All Expenses by project_id Controller --------------------------------------------------------------------------------
// * Creating a getExpenses controller function that will accept a request and a
// *  response object. It will return all the expenses associated with a project
// *   with the fields defined by the query.
// # It will only show the projects associated with the user that is logged in.
const getExpenses = (req, res) => {
  const projectID = req.params.projectID;

  if (!projectID) {
    res.sendStatus(400);
    return;
  }

  const sql = `SELECT project_id, expense_date, expense_type, vendor_name, expense_amount FROM expenses JOIN projects ON expenses.project_id = projects.id WHERE expenses.project_id = ?;`;

  const params = [projectID];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The getExpenses route failed: ${err}`);
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

// % Get Expense By ID Controller --------------------------------------------------------------------------------
// * This function will take the request and response object and it will return
// *  a expense based on the id that provided by a path parameter submitted
// *  with the request.

// * If the id is not valid, the response will be "null", else the entire
// * expense will be returned in the response.
const getExpenseByID = (req, res) => {
  const expenseID = req.params.id;

  if (!expenseID) {
    res.sendStatus(400);
    return;
  }
  const sql = `SELECT project_id, expense_date, expense_type, vendor_name,expense_amount FROM expenses where id = ?`;
  const params = [expenseID];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The getExpenseByID route failed: ${err}`);
      res.sendStatus(500);
    } else {
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
      //* Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
      else {
        res.json(rows[0]);
      }
    }
  });
};

// % Create Expense Controller --------------------------------------------------------------------------------
// * This function accepts a request and a response.

// * The expense id will be auto generated as per the mySQL schema.

// * Once the item is created we want to send a response that shows the new
// * object.
const postExpense = (req, res) => {
  const sql =
    'INSERT INTO expenses (project_id, expense_date, expense_type, vendor_name, expense_amount)VALUES(?, ?, ?, ?, ?);';
  const params = [
    req.body.projectID,
    req.body.expenseDate,
    req.body.expenseType,
    req.body.vendorName,
    req.body.expenseAmount,
  ];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The postExpense route failed: ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Expense Created: ${rows}`);
      const resSql =
        'select id, project_id, expense_date, expense_type, vendor_name, expense_amount from expenses where id = ?';
      const params = [rows.insertId];
      db.query(resSql, params, (err, rows) => {
        if (err) {
          console.log(`The postExpense response query failed: ${err}`);
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

// % Update Expense By ID Controller --------------------------------------------------------------------------------
// * This function will take the request and response objects and it will
// * "update" a single expense based on the path parameter submitted with the
// * request.

// # Only expenses associated with the "user" that is logged in can be updated.

// * If the id is not valid, the response will be "null", else the we will run
// * the update query using parameterized SQL Statements.
const updateExpense = (req, res) => {
  const expenseID = req.params.id;

  if (!expenseID) {
    res.sendStatus(400);
    return;
  }

  const sql = `UPDATE expenses SET ? WHERE id = ?`;
  db.query(sql, [req.body, expenseID], (err, rows) => {
    if (err) {
      console.log(`The updateExpense route was not successful: ${err}`);
      res.sendStatus(500);
    } else {
      // * Running another query that makes use of the expense ID to show the
      // *  updated response object.
      const resSqlQuery = `select id, project_id, expense_date, expense_type, vendor_name, expense_amount from expenses where id = ?`;
      // # Saving params array as a variable.
      const resParams = [expenseID];
      db.query(resSqlQuery, resParams, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "getExpenseByID" query failed: ${err}`);
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

// % Delete Expense By ID Controller --------------------------------------------------------------------------------
// * This function will delete an Expense based on the client's request.

// * We will use the path parameter to confirm the expense that needs to be
// * deleted.

// # Only records associated with the "user" that is logged in can be deleted.

// * We will send the response with the number of rows deleted.

const deleteExpense = (req, res) => {
  const expenseID = req.params.id;

  if (!expenseID) {
    res.sendStatus(400);
    return;
  }

  const sql = `DELETE FROM expenses WHERE id = ?`;
  const params = [expenseID];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(`The deleteExpense route failed: ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Number of records deleted: ${rows.affectedRows}`);
      res.json(rows.affectedRows);
    }
  });
};

//* Exporting route functions
module.exports = {
  getExpenses,
  getExpenseByID,
  postExpense,
  updateExpense,
  deleteExpense,
};

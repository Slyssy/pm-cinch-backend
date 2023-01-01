const db = require('../utils/db');

// % GET Users Controller -------------------------------------------------------------------------------
// * The getUsers controller will accept a req & a response.
// * It will return all the users.
const getUsers = (req, res) => {
  // * Creating a variable that stores the value of the SQL query for this
  // *  getUsers route's call back function.
  // # Getting ID, first name, last name, position and password_hash.
  const sqlQuery =
    'select id, first_name, last_name, position, password_hash from users';
  db.query(sqlQuery, (err, rows) => {
    // * If there is an error, we want to send an error code and log the error.
    if (err) {
      console.log(`The "getUsers" query failed: ${err}`);
      res.sendStatus(500); // * Sending 500 because error was due to a problem  with the backend.
    } else {
      // * if no error, we want to send the data from the query.
      res.json(rows);
    }
  });
};

// % GET User By ID Controller -------------------------------------------------------------------------------
// * This function will take the request and response object and it will return
// *  a single user based on the id that provided by a path parameter submitted
// *  with the request.

// * If the id is not valid, the response will be "null", else the entire user
// *  will be returned in the response.
const getUsersByID = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const userID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!userID) {
    res.sendStatus(400);
    return;
  }
  // * Storing the SQL query to a variable.
  //# This query will return the ID, first_name, last_name, position, email,
  //# phone, pay_rate, username, and the password_hash.
  // * Using parameterized SQL statements.
  const sqlQuery = `select id, first_name, last_name, position, email, phone, pay_rate, user_name, password_hash from users where id = ?`;
  // * Saving params array which uses the userID as a variable.
  const params = [userID];
  db.query(sqlQuery, params, (err, rows) => {
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

// % UPDATE User By ID Controller -------------------------------------------------------------------------------
// * This function will take the request and response objects and it will
// * "update" a single user based on the path parameter submitted with the
// * request.

// * If the id is not valid, the response will be "null", else the we will run
// * the update query using parameterized SQL Statements.

// TODO: Need to address how to update passwords.
const updateUser = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const userID = req.params.id;
  console.log(userID);
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!userID) {
    console.log(`You got a stupid error.`);
    res.sendStatus(400);
    return;
  }
  // * Storing the SQL query to a variable.
  // # Using parameterized SQL statements.
  const sqlQuery = 'UPDATE users SET ? WHERE id = ?';
  // * Running the query using the req.body as a parameterized query.
  db.query(sqlQuery, [req.body, userID], (err, rows) => {
    if (err) {
      console.log(`The updateUser route was not successful: ${err}`);
      res.sendStatus(500); // # Sending 500 because error likely will originate from the backend.
    } else {
      // * Running another query that makes use of the user ID to show the
      // *  updated response object.
      const resSqlQuery = `select id, first_name, last_name, position, email, phone, pay_rate, user_name, password_hash from users where id = ?`;
      // # Saving params array as a variable.
      const resParams = [userID];
      db.query(resSqlQuery, resParams, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "getUsersByID" query failed: ${err}`);
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

// % UPDATE User By ID Controller -------------------------------------------------------------------------------
// * This function will delete a user based on the client's request.
// * We will use the path parameter to confirm the user that needs to be
// * deleted.
// * We will send the response with the number of rows deleted.
const deleteUser = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const userID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!userID) {
    res.sendStatus(400);
    return;
  }
  // * Storing the SQL query to a variable.
  // # Using parameterized SQL statements.
  const sqlQuery = 'DELETE FROM users WHERE id = ?';
  const params = [userID];
  db.query(sqlQuery, params, (err, rows) => {
    if (err) {
      console.log('The deleteUser route failed', err);
      res.sendStatus(500); // # Sending 500 because error likely will originate from the backend.
    } else {
      console.log(`Number of records deleted: ${rows.affectedRows}`);
      // * Sending the number of rows that have been deleted
      res.json(rows.affectedRows);
    }
  });
};

//* Exporting route functions
module.exports = {
  getUsers,
  getUsersByID,
  updateUser,
  deleteUser,
};

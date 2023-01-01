const mysql = require('mysql');

// * Creating a connection variable to store the mysql database connection.
// * Using process.env to access variable in .env file that stores private login
// * credentials.

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect();

// * Running a query an call back function that will  test the connection. I
// * will receive an error if connection is unsuccessful, or I will get the
// * current time.
connection.query('select now()', (err, rows) => {
  // * If error is truthy, console log the error.
  if (err) {
    console.log(`Connection not successful: ${err}`);
  } else {
    // * if error object is falsy, our query will be executed and we will log
    // * the rows.
    console.log('Test query results', rows);
  }
});

connection.queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
module.exports = connection;

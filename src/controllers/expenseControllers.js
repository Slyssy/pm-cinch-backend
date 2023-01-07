const pool = require('../../sql/connection');

// % Create Expense Controller --------------------------------------------------------------------------------
//# Controller to CREATE new Expense.
const create = (req, res) => {
  const tokenUserID = req.user.id;
  const tokenOrganizationID = req.user.organization_id;
  console.log(tokenUserID, tokenOrganizationID);
  // ? Abstracting the variable values
  const params = [
    null,
    req.body.projectID,
    req.body.expenseDate,
    req.body.expenseType,
    req.body.vendorName,
    req.body.expenseAmount,
  ];
  const sql =
    'INSERT INTO expenses (id, project_id, expense_date, expense_type, vendor_name, expense_amount)VALUES(?, ?, ?, ?, ?, ?)';

  pool.query(sql, params, (err, results, fields) => {
    res.json(results);
  });
};
// % Get All Expenses by project_id Controller --------------------------------------------------------------------------
//# Controller to GET all expenses for a project.
const list = (req, res) => {
  const projectID = req.params.projectID;

  const params = [projectID];

  const sql = `SELECT project_id, organization_id, expense_date, expense_type, vendor_name, expense_amount FROM expenses JOIN projects ON expenses.project_id = projects.id WHERE expenses.project_id = ?`;

  //? Kicking out of the function if a project id is not entered.
  if (!projectID) {
    res.sendStatus(400);
    return;
  }

  pool.query(sql, params, (err, results, fields) => {
    res.json(results);
  });
};

// % Get Expense By ID Controller --------------------------------------------------------------------------------
// # Controller to GET expense by ID
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM expenses WHERE id = ${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};
// // * This function will take the request and response object and it will return
// // *  a expense based on the id that provided by a path parameter submitted
// // *  with the request.

// // * If the id is not valid, the response will be "null", else the entire
// // * expense will be returned in the response.
// const getExpenseByID = (req, res) => {
//   const expenseID = req.params.id;

//   if (!expenseID) {
//     res.sendStatus(400);
//     return;
//   }
//   const sql = `SELECT project_id, expense_date, expense_type, vendor_name,expense_amount FROM expenses where id = ?`;
//   const params = [expenseID];
//   db.query(sql, params, (err, rows) => {
//     if (err) {
//       console.log(`The getExpenseByID route failed: ${err}`);
//       res.sendStatus(500);
//     } else {
//       if (rows.length > 1) {
//         console.log(
//           'Something went wrong. More than 1 row was returned for id:',
//           userID
//         );
//         res.sendStatus(500); //* Sending 500 because there is something wrong with the backend.
//       }
//       // * If no rows returned we will send back null to the client. Request is good, but there are no matching records.
//       else if (rows.length === 0) {
//         res.json(null);
//       }
//       //* Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
//       else {
//         res.json(rows[0]);
//       }
//     }
//   });
// };

// // % Create Expense Controller --------------------------------------------------------------------------------
// // * This function accepts a request and a response.

// // * The expense id will be auto generated as per the mySQL schema.

// // * Once the item is created we want to send a response that shows the new
// // * object.
// const postExpense = (req, res) => {
//   const sql =
//     'INSERT INTO expenses (project_id, expense_date, expense_type, vendor_name, expense_amount)VALUES(?, ?, ?, ?, ?);';
//   const params = [
//     req.body.projectID,
//     req.body.expenseDate,
//     req.body.expenseType,
//     req.body.vendorName,
//     req.body.expenseAmount,
//   ];
//   db.query(sql, params, (err, rows) => {
//     if (err) {
//       console.log(`The postExpense route failed: ${err}`);
//       res.sendStatus(500);
//     } else {
//       console.log(`Expense Created: ${rows}`);
//       const resSql =
//         'select id, project_id, expense_date, expense_type, vendor_name, expense_amount from expenses where id = ?';
//       const params = [rows.insertId];
//       db.query(resSql, params, (err, rows) => {
//         if (err) {
//           console.log(`The postExpense response query failed: ${err}`);
//           res.sendStatus(500);
//         } else {
//           if (rows.length > 1) {
//             console.log(
//               `Something went wrong. More than one row was returned for expense_id selected`
//             );
//             res.sendStatus(500);
//           } else if (rows.length === 0) {
//             res.json(null);
//           } else {
//             res.json(rows[0]);
//           }
//         }
//       });
//     }
//   });
// };

// % Update Expense By ID Controller --------------------------------------------------------------------------------
// # Controller to UPDATE expense by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE expenses SET ? WHERE id = ?',
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// % Delete Expense By ID Controller --------------------------------------------------------------------------------
// # Controller to DELETE expense by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM expenses WHERE id = ?', [id], (err, row, fields) => {
    res.json(row);
  });
};

module.exports = {
  create,
  list,
  show,
  update,
  remove,
};

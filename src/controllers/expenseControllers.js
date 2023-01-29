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

  const sql = `SELECT expenses.id, project_id, organization_id, expense_date, expense_type, vendor_name, expense_amount FROM expenses JOIN projects ON expenses.project_id = projects.id WHERE expenses.project_id = ?`;

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

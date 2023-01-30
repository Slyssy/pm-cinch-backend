const pool = require('../../sql/connection');

// % Create Change Controller --------------------------------------------------------------------------------
//# Controller to CREATE new Expense.
const create = (req, res) => {
  const tokenUserID = req.user.id;
  const tokenOrganizationID = req.user.organization_id;
  console.log(tokenUserID, tokenOrganizationID);
  // ? Abstracting the variable values
  const params = [
    null,
    req.body.projectID,
    req.body.coName,
    req.body.coDescription,
    req.body.coStatus,
    req.body.dateSubmitted,
    req.body.dateApproved,
    req.body.coRevenue,
    req.body.coLaborExpense,
    req.body.coMaterialExpense,
    req.body.coSubcontractorExpense,
    req.body.coMiscellaneousExpense,
  ];
  const sql =
    'INSERT INTO change_orders (id, project_id, co_name, co_description, co_status, date_submitted, date_approved, co_revenue, co_labor_expense, co_material_expense, co_subcontractor_expense, co_miscellaneous_expense)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  pool.query(sql, params, (err, results, fields) => {
    res.json({
      changeOrder: {
        project_id: req.body.projectID,
        co_name: req.body.coName,
        co_description: req.body.coDescription,
        co_status: req.body.coStatus,
        date_submitted: req.body.dateSubmitted,
        date_approved: req.body.dateApproved,
        co_revenue: req.body.coRevenue,
        co_labor_expense: req.body.coLaborExpense,
        co_material_expense: req.body.coMaterialExpense,
        co_subcontractor_expense: req.body.coSubContractorExpense,
        co_miscellaneous_expense: req.body.coMiscellaneousExpense,
      },
    });
  });
};
// % Get All Change Orders by project_id Controller --------------------------------------------------------------------------
//# Controller to GET all change orders for a project.
const list = (req, res) => {
  const projectID = req.params.projectID;

  const params = [projectID];

  const sql = `SELECT change_orders.id, project_id, co_name, co_description, co_status, date_submitted, date_approved, co_revenue, co_labor_expense, co_material_expense, co_subcontractor_expense, co_miscellaneous_expense FROM change_orders JOIN projects ON change_orders.project_id = projects.id WHERE change_orders.project_id = ?`;

  //? Kicking out of the function if a project id is not entered.
  if (!projectID) {
    res.sendStatus(400);
    return;
  }

  pool.query(sql, params, (err, results, fields) => {
    res.json(results);
  });
};

// % Get Change Order By ID Controller --------------------------------------------------------------------------------
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM change_orders WHERE id = ${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// % Update Change Order By ID Controller --------------------------------------------------------------------------------
// # Controller to UPDATE expense by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE change_orders SET ? WHERE id = ?',
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// % Delete Change Order By ID Controller --------------------------------------------------------------------------------
// # Controller to DELETE expense by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query(
    'DELETE FROM change_orders WHERE id = ?',
    [id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

module.exports = {
  create,
  list,
  show,
  update,
  remove,
};

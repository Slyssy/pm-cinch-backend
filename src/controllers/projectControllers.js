const pool = require('../../sql/connection');

// % Create New Project Controller --------------------------------------------------------------------------------

// # Controller to CREATE NEW Project
const create = (req, res) => {
  const tokenUserID = req.user.id;
  const tokenOrganizationID = req.user.organization_id;
  // console.log(tokenUserID, tokenOrganizationID);
  // ? Abstracting the variable values
  const params = [
    null,
    tokenUserID,
    tokenOrganizationID,
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
  pool.query(
    `INSERT INTO projects (id, user_id, organization_id, project_name, street_1, street_2, city, state, zip, project_status, project_margin, original_revenue, adjusted_revenue, budgeted_material_expense, budgeted_labor_expense, budgeted_subcontractor_expense, budgeted_miscellaneous_expense, adjusted_material_expense, adjusted_labor_expense, adjusted_subcontractor_expense, adjusted_miscellaneous_expense, actual_material_expense, actual_labor_expense, actual_subcontractor_expense, actual_miscellaneous_expense, estimated_start_date, estimated_complete_date, actual_start_date, actual_complete_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    params,
    (err, results, fields) => {
      res.json(results);
    }
  );
};

//# Controller to GET all projects.
const list = (req, res) => {
  pool.query(
    // `SELECT * FROM projects WHERE organization_id = ${req.user.organization_id}`,
    `SELECT * FROM projects `,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// # Controller to GET project by ID
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM projects WHERE id = ${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// # Controller to UPDATE project by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE projects SET ? WHERE id = ?',
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// # Controller to DELETE project by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM projects WHERE id = ?', [id], (err, row, fields) => {
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

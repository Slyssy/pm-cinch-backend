const pool = require('../../sql/connection');

// # Controller to CREATE NEW Organization
const create = (req, res) => {
  const { companyName, street1, street2, city, state, zip } = req.body;
  // ? Abstracting the variable values
  const params = [null, companyName, street1, street2, city, state, zip];
  pool.query(
    `INSERT INTO organizations (id, company_name, street_1, street_2, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    params,
    (err, results, fields) => {
      res.json(results);
    }
  );
};

//# Controller to GET all organizations
const list = (req, res) => {
  pool.query('SELECT * FROM organizations', function (err, rows, fields) {
    res.json(rows);
  });
};

// # Controller to GET organization by ID
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM organizations WHERE id = ${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// # Controller to UPDATE organization by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE organizations SET ? WHERE id = ?',
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// # Controller to DELETE organization by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query(
    'DELETE FROM organizations WHERE id = ?',
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

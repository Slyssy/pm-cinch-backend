const pool = require('../../sql/connection');

//% Controller to GET all users that are associated with the user that is logged in.
const list = (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE organization_id = ${req.user.organization_id}`,
    function (err, rows, fields) {
      console.log(rows);
      res.json(rows);
    }
  );
};

// # Controller to GET USER by ID
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM users WHERE id = ${id} AND organization_id = ${req.user.organization_id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// # Controller to UPDATE USER by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    `UPDATE users SET ? WHERE id = ? AND organization_id =${req.user.organization_id}`,
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// # Controller to DELETE USER by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query(
    `DELETE FROM users WHERE id = ? AND organization_id =${req.user.organization_id}`,
    [id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

module.exports = {
  list,
  show,
  update,
  remove,
};

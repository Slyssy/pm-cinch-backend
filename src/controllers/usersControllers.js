const pool = require('../../sql/connection');

//% Controller to GET all users
const list = (req, res) => {
  pool.query('SELECT * FROM users', function (err, rows, fields) {
    console.log(rows);
    res.json(rows);
  });
};

// # Controller to GET USER by ID
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM users WHERE id = ${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// # Controller to UPDATE USER by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE users SET ? WHERE id = ?',
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// # Controller to DELETE USER by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM users WHERE id = ?', [id], (err, row, fields) => {
    res.json(row);
  });
};

module.exports = {
  list,
  show,
  update,
  remove,
};

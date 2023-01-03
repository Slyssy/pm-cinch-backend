const pool = require('../../sql/connection');
const bcrypt = require('bcrypt');

// # Controller to CREATE NEW USER
const create = async (req, res) => {
  const {
    organizationId,
    firstName,
    lastName,
    position,
    email,
    payRate,
    password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  // ? Abstracting the variable values
  const params = [
    null,
    organizationId,
    firstName,
    lastName,
    position,
    email,
    payRate,
    hashedPassword,
  ];
  pool.query(
    `INSERT INTO users (id, organization_id, first_name, last_name, position, email, pay_rate, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    params,
    (err, results, fields) => {
      console.log(results);
      res.json(results);
    }
  );
};

module.exports = { create };

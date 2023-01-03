const pool = require('../../sql/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

const signin = (req, res) => {
  const { password, email } = req.body;

  pool.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    async (err, results, fields) => {
      if (err) {
        console.log(err);
      }

      const match = await bcrypt.compare(password, results[0].password_hash);

      if (match) {
        // ? Authenticated user.
        const token = generateToken(results[0]);
        res.json({
          token,
          user: req.user,
        });
      } else {
        // ? Not authenticated.
        res.sendStatus(403);
      }
    }
  );
};

module.exports = { signin };

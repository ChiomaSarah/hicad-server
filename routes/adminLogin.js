const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const generateToken = require("../utils/generateToken");
const validEmail = require("../middleware/validEmail.js");

router.post("/login", validEmail, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM adminPage WHERE email = $1", [
      email,
    ]);

    if (user.rows.length == 0) {
      return res.status(401).json({ error: " Oops! Access denied!" });
    } else {
      await bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          return res.status(500).json(error);
        }
        const insertQuery =
          "INSERT INTO adminPage (email, password) VALUES($1,$2) RETURNING *";
        const values = [email, hash];
        pool
          .query(insertQuery, values)
          .then((result) => {
            newUser = result.rows[0];
            if (newUser) {
              return res.json({
                message: "Success!",
                token: generateToken(newUser),
                newUser,
              });
            }

            return res.status(201).json({
              status: "success",
              data: {
                newUser,
                token,
              },
            });
          })
          .catch((e) => {
            return res.status(500).send({
              message: "failure",
              e,
            });
          });
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  pool.end;
});

module.exports = router;

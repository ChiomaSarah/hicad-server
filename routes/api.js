const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const auth = require("../middleware/verifyToken");
const validData = require("../middleware/validData.js");

router.get("/candidates", auth.verify, async (req, res) => {
  try {
    await pool.query("Select * from candidates", (err, result) => {
      if (!err) {
        return res.json({
          status: 200,
          message: "Successful... Candidates Retrieved!",
          data: result.rows,
        });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  pool.end;
});

router.post("/application", validData, async (req, res) => {
  const file = req.files.image;
  try {
    let data = {
      firstname: req.body.firstname,
      surname: req.body.surname,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      state_of_origin: req.body.state_of_origin,
      local_government: req.body.local_government,
      passport_photograph: req.body.image,
    };

    const user = await pool.query("SELECT * FROM candidates LIMIT 4");

    if (user.rows.length == 4) {
      return res.status(403).json({
        error: "Application closed!",
      });
    } else {
      cloudinary.uploader
        .upload(file.tempFilePath)
        .then((image) => {
          const insertQuery =
            "INSERT INTO candidates (firstname, surname, phone_number, email_address, state_of_origin, local_government, passport_photograph) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
          const values = [
            data.firstname,
            data.surname,
            data.phone_number,
            data.email_address,
            data.state_of_origin,
            data.local_government,
            image.secure_url,
          ];

          pool
            .query(insertQuery, values)
            .then((result) => {
              newUser = result.rows[0];

              return res.status(201).send({
                status: "success",
                data: {
                  newUser,
                },
              });
            })
            .catch((err) => {
              return res.status(500).send({
                message: "Image upload failed!",
                err,
              });
            });
        })
        .catch((err) => {
          return res.status(500).send({
            message: "Failed to save to the database!",
            err,
          });
        });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  pool.end;
});

module.exports = router;

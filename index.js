const express = require("express");
const pool = require("./db");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({ useTempFiles: true }));

const apiRouter = require("./routes/api");
app.use("/job", apiRouter);

const adminLoginRouter = require("./routes/adminLogin");
app.use("/admin", adminLoginRouter);


pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to the Database!");
  });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Server is listening on port ${PORT}`);
});

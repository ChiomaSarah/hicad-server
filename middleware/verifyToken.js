require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

exports.verify = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // const user = res.locals.loggedInUser;
    jwt.verify(token.split(" ")[1], tokenSecret, (err, user) => {
      if (err)
        return res
          .status(401)
          .json({
            error:
              "Unauthorized access! You have to be an admin to access this page.",
          });

      req.user = user.data;
      next();
    });
  } catch (error) {
    next(error);
  }
};

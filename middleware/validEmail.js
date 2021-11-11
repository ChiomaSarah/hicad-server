module.exports = (req, res, next) => {
  const { email, password } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/login") {
    //   console.log(!email.length);
    if (![email, password].every(Boolean)) {
      return res
        .status(401)
        .json({ error: "Missing Credentials. All fields are required" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ error: "Invalid Email" });
    }
  }

  next();
};

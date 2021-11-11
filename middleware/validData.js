module.exports = (req, res, next) => {
  const {
    firstname,
    surname,
    phone_number,
    email_address,
    state_of_origin,
    local_government,
  } = req.body;

  function validData(email_address) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_address);
  }

  if (req.path === "/application") {
    //   console.log(!email_address.length);
    if (
      ![
        firstname,
        surname,
        phone_number,
        email_address,
        state_of_origin,
        local_government,
      ].every(Boolean)
    ) {
      return res
        .status(401)
        .json({ error: "Missing Credentials. All fields are required" });
    } else if (!validData(email_address)) {
      return res.status(401).json({ error: "Invalid Email" });
    }
  }

  next();
};

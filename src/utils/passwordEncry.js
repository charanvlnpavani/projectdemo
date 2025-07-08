const bcrypt = require("bcrypt");

const passwordEncry = (req) => {
  const { password } = req.body;
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashPassword;
  return req;
};

module.exports = { passwordEncry };

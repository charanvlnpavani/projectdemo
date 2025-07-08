const Validator = require("validator");

const signupValidation = (req) => {
  console.log("request is ", req.body);
  const [name, password, email, phoneno] = Object.values(req.body);
  console.log(name, password, email, phoneno);
  if (!name || !password || !email || !phoneno) {
    throw new Error("Please fill all the fields");
  } else if (!Validator.isLength(name, { min: 4, max: 50 })) {
    throw new Error("Name must be between 4 and 50 characters");
  } else if (!Validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (!Validator.isEmail(email)) {
    throw new Error("Invalid email format");
  } else if (!Validator.isMobilePhone(phoneno)) {
    throw new Error("Invalid phone number");
  }
};

module.exports = { signupValidation };

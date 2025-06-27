const authUser = (req, res, next) => {
  const token = "1234567890";
  const Autherize = token === "1234567890";
  if (!Autherize) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const authAdmin = (req, res, next) => {
  const token = "12345";
  const Autherize = token === "12345";
  if (!Autherize) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  authUser,
  authAdmin,
};

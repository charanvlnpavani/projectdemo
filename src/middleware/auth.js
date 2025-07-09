const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please Login First...! Token Not Found");
    }
    const decodeData = await jwt.verify(token, "P!vlnc@98@!#$SWfhgt");
    const { id } = decodeData;
    const user = await User.findById({ _id: id });
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error in Authentication: " + error.message);
  }
};

module.exports = {
  authAdmin,
};

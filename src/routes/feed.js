const express = require("express");
const User = require("../models/user");
const { authAdmin } = require("../middleware/auth");
const feedRouter = express.Router();

feedRouter.get("/feedData", authAdmin, async (req, res) => {
  try {
    const userEmail = req.body.email;
    const emailValid = await User.findOne({
      email: userEmail,
    });
    if (!emailValid) {
      res.status(404).send("User not found");
    } else {
      res.send(emailValid);
    }
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }

  res.send(
    "This is the feed data endpoint. You can add your feed data logic here."
  );
});

module.exports = {
  feedRouter,
};

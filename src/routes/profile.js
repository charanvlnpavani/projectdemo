const express = require("express");
const { authAdmin } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/profile", authAdmin, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error Fetching User Count: " + err);
  }
});

module.exports = {
  profileRouter,
};

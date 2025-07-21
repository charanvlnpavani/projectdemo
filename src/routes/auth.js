const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupValidation } = require("../utils/signupValidation");
const { passwordEncry } = require("../utils/passwordEncry");

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate user data
    signupValidation(req);
    //Encrypt password
    passwordEncry(req);
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      phoneno: req.body.phoneno,
    });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    
    if (!user) {
      throw new Error("Credentials not found");
    }
    
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error("Credentials not found");
    }
    
    const token = await jwt.sign({ id: user._id }, "P!vlnc@98@!#$SWfhgt");
    res.cookie("token", token);
    res.send("User Logged in Successfully");
  } catch (error) {
    res.status(400).send("Error logging in user: " + error.message);
  }
});

module.exports = {
  authRouter,
};

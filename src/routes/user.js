const express = require("express");
const User = require("../models/user");
const { authAdmin } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/user", authAdmin, async (req, res) => {
  const userEmail = req.body.email;
  const user = await User.find({ email: userEmail });
  try {
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Error fetching user: " + error.message);
  }
});

userRouter.get("/allUsers", authAdmin, async (req, res) => {
  const users = await User.find({});
  try {
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Error fetching users: " + error.message);
  }
});
//get user Count
userRouter.get("/userCount", async (req, res) => {
  const userCount = await User.countDocuments({});
  try {
    if (userCount === 0) {
      res.status(404).send("No users are found");
    }
    res.send(`Total number of users: ${userCount}`);
  } catch (error) {
    res.status(400).send("Error Fetching User Count: " + error);
  }
});

userRouter.patch("/user/:userId", authAdmin, async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;
  try {
    const ALLOWED_UPDATE_DATA = [
      "age",
      "gender",
      "address",
      "password",
      "skills",
    ];
    const isAllowedUpdateData = Object.keys(data).every((update) =>
      ALLOWED_UPDATE_DATA.includes(update)
    );
    if (!isAllowedUpdateData) {
      throw new Error("Invalid update data");
    }
    const updateName = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updateName);

    if (!updateName) {
      res.status(404).send("User not found");
    }
    res.status(200).send("User Data Update Successfully");
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
  }
});

userRouter.delete("/user", authAdmin, async (req, res) => {
  const userId = req.body._id;
  console.log("User ID to delete:", userId);
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error deleting user: " + err.message);
  }
});
module.exports = {
  userRouter,
};

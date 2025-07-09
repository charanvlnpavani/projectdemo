const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { signupValidation } = require("./utils/signupValidation");
const { passwordEncry } = require("./utils/passwordEncry");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
//post user data
app.post("/signup", async (req, res) => {
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
//post login user data
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const token = await jwt.sign({ id: user._id }, "P!vlnc@98@!#$SWfhgt");

    if (!user) {
      throw new Error("Credentials not found");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error("Credentials not found");
    }
    res.cookie("token", token);
    res.send("User Logged in Successfully");
  } catch (error) {
    res.status(400).send("Error logging in user: " + error.message);
  }
});
// get  user data
app.get("/user", async (req, res) => {
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
// get user feed dat
app.get("/feedData", async (req, res) => {
  const userEmail = req.body.email;
  const emailValid = await User.findOne({
    email: userEmail,
  });
  try {
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
//get all users data
app.get("/allUsers", async (req, res) => {
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
app.get("/userCount", async (req, res) => {
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
//get profile
app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Login First...!");
    }
    const decodingJWT = jwt.verify(token, "P!vlnc@98@!#$SWfhgt");
    const user = await User.findById({ _id: decodingJWT.id });
    res.send(user);
  } catch (err) {
    res.status(400).send("Error Fetching User Count: " + err);
  }
});
//update user
app.patch("/user/:userId", async (req, res) => {
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
//delete user
app.delete("/user", async (req, res) => {
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
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    console.log("Starting server...");
    app.listen(port, () => {
      console.log("Server is running on port ", port);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

//Listen for incoming requests

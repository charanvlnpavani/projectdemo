const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const port = 3000;
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
//post user data
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
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
// get user feed data
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
//update user
app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = data._id;
  const updateName = await User.findOneAndUpdate({ _id: userId }, data);
  try {
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

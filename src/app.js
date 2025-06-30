const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const port = 3000;
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    name: "charan vln pavani",
    password: "charan@123",
    email: "charanvlnpavani@gmail.com",
    age: 27,
    gender: "male",
  });
  await user.save();
  res.send("User created successfully");
});

app.get("/signup", async (req, res) => {
  const userFind = new User({
    name: "charan vln pavani",
    password: "charan@12",
  });
  await userFind.validate();
  res.send("User validated successfully");
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

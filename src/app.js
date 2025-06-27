const express = require("express");

const app = express();

const port = 3000;

// Middleware to handle all requests

app.get("/user", (req, res) => {
  res.send({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    password: "John@123",
  });
});

app.post("/user", (req, res) => {
  res.send({
    message: "User created successfully",
  });
});

app.delete("/user", (req, res) => {
  res.send({
    message: "User deleted successfully",
  });
});

//Listen for incoming requests
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

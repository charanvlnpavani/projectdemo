const express = require("express");
const auth = require("./middleware/auth");
const { connectDB } = require("./config/database");

const port = 3000;
const app = express();
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

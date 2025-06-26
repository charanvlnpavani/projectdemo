const express = require("express");

const app = express();

const port = 3000;

// Middleware to handle all requests
app.use((req, res) => {
  res.send("Hello response for expres2");
});

//Listen for incoming requests
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

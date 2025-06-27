const express = require("express");
const auth = require("./middleware/auth");

const port = 3000;
const app = express();

//User Routes
app.get("/user", auth.authUser, (req, res, next) => {
  console.log("Middleware is running");
  res.send("Hello from the user route");
});
app.get("/user/details", (req, res, next) => {
  console.log("Details route is running");
  res.send("Hello from the user details route");
});

//Admin Routes
app.get("/admin", auth.authAdmin, (req, res, next) => {
  console.log("Middleware is running");
  res.send("Hello from the admin route");
});
app.get("/admin/details", (req, res, next) => {
  console.log("Details route is running");
  res.send("Hello from the admin details route");
});
//Listen for incoming requests
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

const express = require("express");

const app = express();

const port = 3000;

//Single Middleware to handle all requests

// app.get("/user", (req, res) => {
//   //Router handles the request
//   res.send({
//     name: "John Doe",
//     age: 30,
//     email: "john.doe@example.com",
//     password: "John@123",
//   });
// });

// app.post("/user", (req, res) => {
//   res.send({
//     message: "User created successfully",
//   });
// });

// app.delete("/user", (req, res) => {
//   res.send({
//     message: "User deleted successfully",
//   });
// });

//Multiple middlewares for the same route
app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("User route accessed");
      // res.send("Hello from user route");
      next();
    },
  ],
  [
    (req, res, next) => {
      console.log("This is the second middleware for user route");
      res.send("Hello from second middleware for user route");
      // next();
    },
  ]
);

//Listen for incoming requests
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

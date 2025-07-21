const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const { profileRouter } = require("./routes/profile");
const { feedRouter } = require("./routes/feed");

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", feedRouter);

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

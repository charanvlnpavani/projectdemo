const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pavanicharanvln:0a2NeIgZ5lrqE1iG@namastenode.xxovjkh.mongodb.net/testingDB"
  );
};

module.exports = { connectDB };

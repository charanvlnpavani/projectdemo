const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 15,
      trime: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Invalid email format",
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(v) {
        if (!["male", "female", "other"].includes(v)) {
          throw new Error("Invalid Gender Value - Must be male/female/other");
        }
        return true;
      },
    },
    phoneno: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validate that the phone number is 10 digits
        },
        message: "Phone number must be 10 digits",
      },
    },
    address: {
      type: String,
      default: "Not Provided Yet - Please Update Your Address",
      minLength: 10,
      maxLength: 500,
    },
    skills: {
      type: [String],
      required: true,
      validate: function (v) {
        if (v.length > 10) {
          throw new Error("Please Select Only 10 Skills");
        }
        return true;
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ email: 1 }, { unique: true }); // Explicitly create unique index

const User = mongoose.model("User", userSchema);

module.exports = User;

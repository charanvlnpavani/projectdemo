const mongoose = require("mongoose");
const validator = require("validator");

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
      trim: true,
      validate: {
        validator: function (v) {
          return validator.isStrongPassword(v);
        },
        message: "Password is not strong enough",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
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
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return String(v).length === 10; // Validate that the phone number is 10 digits
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

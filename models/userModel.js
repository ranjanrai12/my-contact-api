const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email address"],
      uniq: [true, "Email already registerd"],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);

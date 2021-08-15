const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  userType: {
    type: String,
    enum: ["user", "validUser", "admin"],
    default: "user",
  },
  token: String,
});

module.exports = mongoose.model("User", UserSchema);

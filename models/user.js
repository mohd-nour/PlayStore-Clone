const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    wishlist: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ], // array of wishlist IDs
    lastVisited: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ], // array of visited IDs
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;

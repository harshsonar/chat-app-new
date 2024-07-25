// create schema for User object.
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true, default: uuidv4 },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  convIds: [{ convId: String }],
});
// convIds is an array of conversation Ids which a user is a part of.

// Middleware to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    console.log(this.passwordHash);
    next();
  } catch {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);

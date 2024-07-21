// create schema for User object.
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true, default: uuidv4},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    convIds: [{convId: String}]
})
// convIds is an array of conversation Ids which this user is a part of.

module.exports = mongoose.model('User', UserSchema);
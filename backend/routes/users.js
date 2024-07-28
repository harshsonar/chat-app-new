// /users/registerUser
// /users/deleteUser
// /users/updateUser
// /users/searchUser -- for home/addChat

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST api to create a new user.
// Will be triggered when user Signs up for first time.
router.post("/registerUser", async (req, res) => {
  const obj = req.body;
  try {
    const user = new User({
      username: obj.username,
      email: obj.email,
      passwordHash: obj.password,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/deleteUser", (req, res) => {});

router.post("/updateUser", (req, res) => {});

router.get("/searchUser", (req, res) => {});

module.exports = router;

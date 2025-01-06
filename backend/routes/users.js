// /users/registerUser
// /users/deleteUser
// /users/updateUser
// /users/searchUser -- for home/addChat

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/deleteUser", (req, res) => {});

router.post("/updateUser", (req, res) => {});

router.get("/searchUser", (req, res) => {});

module.exports = router;

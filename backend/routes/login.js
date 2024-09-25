const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../environments/environment');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ email: user.email, password: user.passwordHash }, JWT_KEY, { expiresIn: '1h' });
}

router.post("", (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.findOne({ email });
    if(!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log(user);
    
    const isMatch = bcrypt.compare(password, user.passwordHash);
    if(!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    
    const token = generateToken(user);
    
    console.log(token);
    
    res.json({token});
  } 
  catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error'});
  }
});

module.exports = router;






const jwt = require("jsonwebtoken");
const JWT_KEY = require("../environments/environment");

const authMiddleware = (req, res, next) => {
  let token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, JWT_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;

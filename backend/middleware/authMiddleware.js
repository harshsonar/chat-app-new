const jwt = require("jsonwebtoken");
const JWT_KEY = require("../environments/environment");

const generateToken = (user) => {
  return jwt.sign({ email: user.email, password: user.passwordHash }, JWT_KEY, { expiresIn: '24h' });
}

const authMiddleware = (req, res, next) => {
  let token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, JWT_KEY);

    const newToken = generateToken(user);
    res.cookie("authToken", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;

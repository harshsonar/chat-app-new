const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

// require the routes
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const usersRouter = require("./routes/users");
const conversationsRouter = require("./routes/conversations");
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {});

// use middleware .use() to trigger specific routes
app.use("/registerUser", registerRouter);
app.use("/loginUser", loginRouter);
app.use("/users", authMiddleware, usersRouter);
app.use("/home", authMiddleware, conversationsRouter);

app.listen(3000);

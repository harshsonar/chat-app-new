const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {});

// require the routes
const usersRouter = require("./routes/users");
const conversationsRouter = require("./routes/conversations");
const loginRouter = require('./routes/login')

// use middleware .use() to trigger specific routes
app.use("/users", usersRouter);
app.use("/home", conversationsRouter);
app.use("/loginUser", loginRouter);

app.listen(3000);

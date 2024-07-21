const express = require("express");
const mongoose = require("mongoose");  
const cors = require("cors") 
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/chat-app', {});

// require the routes 
const usersRouter = require("./routes/users");
const conversationsRouter = require("./routes/conversations");

// use middleware .use() to trigger specific routes
app.use('/users', usersRouter);
app.use('/home', conversationsRouter);


app.listen(3000);
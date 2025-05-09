const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {});

// WebSocket event handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user registration
  socket.on("register", async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      socket.emit("register-response", {
        success: true,
        message: "User registered successfully",
      });
    } catch (err) {
      socket.emit("register-response", {
        success: false,
        message: "Registration failed",
      });
    }
  });

  // Handle user login
  socket.on("login", async (credentials) => {
    const user = await User.findOne({ email: credentials.email });
    if (user && user.password === credentials.password) {
      socket.emit("login-response", {
        success: true,
        userId: user._id,
        username: user.username,
      });
    } else {
      socket.emit("login-response", {
        success: false,
        message: "Invalid credentials",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

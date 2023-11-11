const express = require("express");
const Router = express.Router();
const User = require("../models/userModel");

// Fetch all users
Router.post("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting users", error: err.message });
  }
});

// Handle a POST request to create a new user
Router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const count = await User.countDocuments();
    const newUser = new User({
      userName,
      password,
      userID: `user${count + 1}`,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

// Handle a POST request to sign in a user
Router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});

// Handle a POST request to update user information
Router.post("/update", async (req, res) => {
  try {
    const { userID, userName, password } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { userID },
      { userName, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

module.exports = Router;

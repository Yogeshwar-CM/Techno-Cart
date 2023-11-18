const express = require("express");
const Router = express.Router();
const User = require("../models/userModel");

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

Router.post("/register", async (req, res) => {
  try {
    const { FullName, userName, password } = req.body;
    const newUser = new User({
      fullname: FullName,
      username: userName,
      password: password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ username: userName, password: password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});

Router.post("/update", async (req, res) => {
  try {
    const { userID, FullName, userName, password } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { userID },
      { FullName, userName, password },
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

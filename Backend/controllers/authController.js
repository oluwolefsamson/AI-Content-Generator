const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // To access .env file

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, specialty } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      specialty,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Respond with token and user data (including the user ID)
    res.json({
      token,
      user: {
        userId: newUser._id, // Add the user ID here
        username: newUser.username,
        email: newUser.email,
        specialty: newUser.specialty,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Respond with token and user data (including the user ID)
    res.json({
      token,
      user: {
        userId: user._id, // Add the user ID here
        username: user.username,
        email: user.email,
        specialty: user.specialty,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser };

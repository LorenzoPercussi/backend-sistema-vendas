const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../config/logger');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    if (!req.body.password || !req.body.email || !req.body.name) {
      logger.error(`Credentials missing: ${error.message}`);
      res.status(400).json({
        hasError: true,
        message: 'All fields required',
      });
    }
    if (length(req.body.password) < 8) {
      logger.error(`Invalid password: ${error.message}`);
      res.status(400).json({
        hasError: true,
        message: 'Password does not meet requirements',
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(400).json({
      hasError: true,
      message: 'Error creating user',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found!' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: 'Invalid password!' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

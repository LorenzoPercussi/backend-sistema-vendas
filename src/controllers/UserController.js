const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    if(!req.body.password || !req.body.email || !req.body.name){
      res.status(400).json({
        hasError: true,
        message: "All fields required",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createdUser = await User.create({ 
      name: req.body.name, 
      email: req.body.email, 
      password: hashedPassword
    });
    
    const userResponse = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };

    res.status(201).json({
      hasError: false,
      message: 'User created successfully!', 
      data: userResponse
    });

    }catch (error){
    res.status(400).json({ 
      hasError:true,
      message: "Error creating user",
      error: error.message 
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found!' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password!' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Never return the password (hash) in the response.
    const user = newUser.toObject();
    delete user.password;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password!',
      });
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};

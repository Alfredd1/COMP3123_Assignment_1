const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Please provide a valid email address',
    },
  },
  password: {
    // hash
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
  },
  created_at: 'Date',
  updated_at: 'Date',
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

/*
_{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "password": "String",      // must be hashed
  "created_at": "Date",
  "updated_at": "Date"
}
 */

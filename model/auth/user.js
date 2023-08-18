// model is only for validation of data sent to mongodb
//genral model for all user and any tenent
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: [true],
    minlength: [4],
    select: false,
  },
  roles: {
    type: [String],
  },
  lastname: {
    type: String,
    lowercase: true,
    trim: true,
  },
  firstname: {
    type: String,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  phonenumber: {
    type: String,
  },
});

const user = mongoose.model('User', userSchema);
module.exports = user;

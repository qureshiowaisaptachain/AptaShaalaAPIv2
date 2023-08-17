// model is only for validation of data sent to mongodb
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true, // Convert email to lowercase
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
  roles:{
    type:[String]
  }
});

const user = mongoose.model('User', userSchema);
module.exports = user;
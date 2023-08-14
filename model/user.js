const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true],
    minlength: [4],
    select: false,
  },
});
const user = mongoose.model('User', userSchema);
module.exports = user;

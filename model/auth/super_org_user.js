// model is only for validation of data sent to mongodb
//genral model for all user and any tenent
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email_id: {
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
  subject_specialization:{
   type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Subjects' }]
  }
});

const super_org_user = mongoose.model('super_org_user', userSchema);
module.exports = super_org_user;

// model is only for validation of data sent to mongodb
//genral model for all user and any tenent
const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  sub_domain: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  domain: {
    type: String,
  },
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subjects' }],
  logo: { type: [String] },
  address: { type: String },
  subscription_expiry_date: { type: Date },
  max_question_limit: { type: String },
  contact_number: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model(`Organization`, organizationSchema);

// model is only for validation of data sent to mongodb
//genral model for all user and any tenent
const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },

  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;

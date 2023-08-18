// only for populating dummy data
// set permission using admin from frontend only
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role
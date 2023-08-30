// only for populating dummy data
// set permission using admin from frontend only
const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

const Role = mongoose.model('RolePermission', rolePermissionSchema);
module.exports = Role;

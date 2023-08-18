const mongoose = require('mongoose');
const organizationSchema = mongoose.Schema({
  schema_id: {
    type: String,
  },
  name: {
    type: String,
  },
  org_users: {
    type: [String],
  },
  subjects: {
    type: String,
  },
  logo: {
    type: String,
  },
  address: {
    type: String,
  },
  subscription_expire_date: {
    type: [String],
  },
  max_question_limit: {
    type: String,
  },
  phoneNumber: {
    type: [String],
  },
  email: {
    type: [String],
  },
});

const organization = mongoose.model('organization', organizationSchema);
module.exports = organization;

const mongoose = require('mongoose');
const organizationSchema = mongoose.Schema({
  schema_identifier: {
    type: String,
    required: true,
  },
  sub_domain: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true],
  },
  org_users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'super_org_user',
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
  subscription_expiry_date: {
    type: Date,
  },
  max_question_limit: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  email: {
    type: String,
  },
});

// above approve date is and approve by data is placeholder
const organization = mongoose.model('organization', organizationSchema);
module.exports = organization;

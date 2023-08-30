const asyncHandler = require('../middleware/asynHandler');
const organization = require('../model/organization');
const ErrorResolver = require('../utility/errorResolver');

exports.addOrganization = asyncHandler(async (req, res, next) => {
  const {
    schema_identifier,
    name,
    org_users,
    subjecs,
    logo,
    address,
    subscription_expiry_date,
    max_question_limit,
    contact_number,
    email,
  } = req.body;

  if (
    !schema_identifier ||
    !name ||
    !org_users ||
    !subjecs ||
    !logo ||
    !address ||
    !subscription_expiry_date ||
    !max_question_limit ||
    !contact_number ||
    !email
  ) {
    throw ErrorResolver('Missing Required Arguments', 400);
  }

  const org = organization.create(req.body);

  if (!org) {
    throw new ErrorResolver('Could Not Create New Organization', 400);
  }

  res.status(200).json({ message: 'Subjects List', user });
});

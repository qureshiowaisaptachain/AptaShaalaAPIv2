const asyncHandler = require('../middleware/asynHandler');
const super_org_user = require('../model/auth/super_org_user'); // Update the import based on your model
const ErrorResolver = require('../utility/errorResolver');

exports.getSubjects = asyncHandler(async (req, res, next) => {
  const user = await super_org_user
    .findById(req.userID)
    .populate({
      path: 'subject_specialization', 
      populate: {
        path: 'chapters',
        populate: {
          path: 'topics', 
        },
      },
    })
    .select({ subjec_specialization: 1 });

  if (!user) {
    throw new ErrorResolver('subject not found', 404);
  }

  res.status(200).json({ message: 'Subjects List', user });
});

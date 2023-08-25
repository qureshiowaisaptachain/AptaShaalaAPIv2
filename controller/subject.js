const asyncHandler = require('../middleware/asynHandler');
const super_org_user =require('../model/auth/super_org_user'); // Update the import based on your model
const ErrorResolver = require('../utility/errorResolver');

exports.getSubjects = asyncHandler(async (req, res, next) => {

    // Fetch subjects based on the subjectID and populate related data
    const user = await super_org_user.findById(req.userID)
    .populate({
      path: 'subject_specialization', // Path to the reference field in the user schema
      populate: {
        path: 'chapters', // Path to the reference field in the subject schema
        populate: {
          path: 'topics', // Path to the reference field in the chapter schema
        }
      }
    }).select({subjec_specialization:1});

    if(!user){
      throw new ErrorResolver("subject not found",404);
    }


  res.status(200).json({ message: 'Subjects List', user});
});

const asyncHandler = require('../middleware/asynHandler');
const {Subject} = require('../model/subjects');
const User =require('../model/auth/user'); // Update the import based on your model
const ErrorResolver = require('../utility/errorResolver');

exports.getSubjects = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.userID);
  
  if (!user) {
    throw new ErrorResolver("User not found", 404);
  }
  console.log(user)
  const subjectID = user.subject_specialization;

  // Fetch subjects based on the subjectID and populate related data
  const subjects = await Subject.find({ _id: subjectID })
    .populate({
      path: 'chapters',
      populate: {
        path: 'topics',
        model: 'Topic',
      },
    })

  if (!subjects) {
    throw new ErrorResolver("Can't Find Subjects List", 500);
  }

  res.status(200).json({ message: 'Subjects List', subjects, statusCode: 200 });
});

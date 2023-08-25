const asyncHandler = require('../middleware/asynHandler');
const Course = require('../model/course');
const ErrorResolver = require('../utility/errorResolver');

exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({});

  if (!courses) {
    throw new ErrorResolver("Can't Find Courses List", 500);
  }

  res.status(200).json({ message: 'Courses List Successfully Retrived', courses });
});
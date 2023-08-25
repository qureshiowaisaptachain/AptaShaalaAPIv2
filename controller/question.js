const asyncHandler = require('../middleware/asynHandler');
const Question = require('../model/questions');
const ErrorResolver = require('../utility/errorResolver');
//todo and add this to task
// validate req.body for null
//validate data for false value
// errorhandling  each case
// add more detail to Questions model as per need
exports.addQuestion = asyncHandler(async (req, res, next) => {
  const newQuestions = await Question.create(req.body);

  if (!newQuestions) {
    throw new ErrorResolver('Question Not Added Try Again', 500);
  }

  res
    .status(200)
    .json({ message: 'New Question Added', newQuestions, statusCode: '201' });
});

exports.getQuestion = asyncHandler(async (req, res, next) => {
  const listQuestions = await Question.find({});

  if (!listQuestions) {
    throw new ErrorResolver('Cant Find Questions List', 500);
  }

  res
    .status(200)
    .json({ message: 'Questions List', listQuestions, statusCode: '200' });
});

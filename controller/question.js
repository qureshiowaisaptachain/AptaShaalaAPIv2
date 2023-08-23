const asyncHandler = require('../middleware/asynHandler');
const Question = require('../model/questions');
const ErrorResolver = require('../utility/errorResolver');
//todo and add this to task
// validate req.body for null
//validate data for false value
// errorhandling  each case
// add more detail to Questions model as per need
exports.addQuestion = asyncHandler(async (req, res, next) => {
  const {
    question,
    answer,
    options,
    difficulty,
    related_exams,
    topic,
    hint,
    create_date,
  } = req.body;

  const newQuestions = await Question.create(req.body);

  if (!newQuestions) {
    throw new ErrorResolver('Question Not Added Try Again', 500);
  }

  res.status(200).json({ message: 'New Question Added', newQuestions });
});

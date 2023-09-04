const asyncHandler = require('../middleware/asynHandler');
const Question = require('../model/questions');
const ErrorResolver = require('../utility/errorResolver');

exports.addQuestion = asyncHandler(async (req, res, next) => {
  req.body['created_by'] = req.userID;
  req.body['approved_by'] = req.userID; // place holder data only
  const newQuestions = await Question.create(req.body);

  if (!newQuestions) {
    throw new ErrorResolver('Question Not Added Try Again', 500);
  }

  res
    .status(200)
    .json({ message: 'New Question Added', newQuestions, statusCode: '201' });
});

exports.getQuestion = asyncHandler(async (req, res, next) => {
  const questionID = req.query['id'];
  var question;

  if (!questionID) {
    question = await Question.find({});
    if (!question) {
      throw new ErrorResolver('Cant Find Questions List', 404);
    }
    return res.status(200).json({
      message: 'Questions List',
      question,
      statusCode: '200',
    });
  }

  question = await Question.find({ _id: questionID });
  if (!question) {
    throw new ErrorResolver('Cant Find Question ', 404);
  }
  res.status(200).json({
    message: 'Questions List',
    question,
    statusCode: '200',
  });
});

exports.queryQuestion = asyncHandler(async (req, res, next) => {
  const {
    id,
    status,
    topic,
    chapter,
    subject,
    difficulty,
    courses_tag,
    create_date,
  } = req.query;

  var query = {};
  if (id) query._id = id;
  if (subject) query.subject = subject;
  if (chapter) query.chapter = chapter;
  if (topic) query.topic = topic;
  if (status) query.status = status;
  if (difficulty) query.difficulty = difficulty;
  if (courses_tag) query.courses_tag = courses_tag;

  if (create_date) {
    query = { $gt: new Date(create_date) };
  }

  const limit = req.paginationData.curr.limit;
  const page = !req.paginationData.curr.page ? 1 : req.paginationData.curr.page;
  const questions = await Question.find(query)
    .populate('topic')
    .populate('chapter')
    .populate('subject')
    .populate('created_by')
    .populate('courses_tags')
    .limit(limit)
    .skip(limit * page);

  res.status(200).json({
    message: 'Questions List',
    questions,
    paginationData: req.paginationData,
    statusCode: '200',
  });
});

exports.updateQuestion = asyncHandler(async (req, res, next) => {
  const questionId = req.query['id'];
  const updateData = req.body;

  const updatedQuestion = await Question.findByIdAndUpdate(
    { _id: questionId },
    updateData
  );

  if (!updatedQuestion) {
    throw new ErrorResolver('Question Not Found', 404);
  }

  res.status(200).json({ message: 'Questions List', updatedQuestion });
});

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const questionID = req.query['id'];

  const deletedQuestion = await Question.findByIdAndDelete({ _id: questionID });

  if (!deletedQuestion) {
    throw new ErrorResolver('Question Not Found', 404);
  }

  res.status(200).json({ message: 'Question deleted successfully' });
});

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

  res.status(200).json({
    success: true,
    message: 'Question Added Successfully',
    newQuestions,
    statusCode: '201',
  });
});

exports.paginationQueryQuestion = asyncHandler(async (req, res, next) => {
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

  const questions = await Question.find(query)
    .populate('topic')
    .populate('chapter')
    .populate('subject')
    .populate('created_by')
    .populate('courses_tags');

  res.status(200).json({
    success: true,
    paginationData: req.paginationData,
    message: 'Questions List',
    questions,
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

  const questions = await Question.find(query)
    .populate('topic')
    .populate('chapter')
    .populate('subject')
    .populate('created_by')
    .populate('courses_tags');

  res.status(200).json({
    success: true,
    message: 'Questions List',
    questions,
    statusCode: '200',
  });
});

exports.textSearch = asyncHandler(async (req, res, next) => {
  const { textToSearch } = req.body;
  let IsQuestionFound = false;
  IsQuestionFound = await Question.find({
    $text: { $search: textToSearch },
  }).count();

  if (IsQuestionFound > 1) {
    res.status(200).json({
      success: true,
      message: 'One Or More Question Found',
      IsQuestionFound: true,
      count:IsQuestionFound,
      statusCode: '200',
    });
  } else {
    res.status(200).json({
      success: true,
      IsQuestionFound: false,
      message: 'Question Not Found',
      statusCode: '200',
    });
  }
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

  res.status(200).json({
    success: true,
    message: 'Question Updated successfully',
    updatedQuestion,
  });
});

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const questionID = req.query['id'];

  const deletedQuestion = await Question.findByIdAndDelete({ _id: questionID });

  if (!deletedQuestion) {
    throw new ErrorResolver('Question Not Found', 404);
  }

  res
    .status(200)
    .json({ success: true, message: 'Question deleted successfully' });
});

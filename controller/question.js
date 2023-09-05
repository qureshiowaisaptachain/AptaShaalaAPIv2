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

  const pipeline = [];

  // Match stage to filter documents based on query parameters
  const matchStage = {
    $match: {
      $or: [
        id ? { _id: { $in: id.map(id => mongoose.Types.ObjectId(id)) } } : {},
        status ? { status: { $in: Array.isArray(status) ? status : [status] } } : {},
        topic ? { topic: { $in: Array.isArray(topic) ? topic : [topic] } } : {},
        chapter ? { chapter: { $in: Array.isArray(chapter) ? chapter : [chapter] } } : {},
        subject ? { subject: { $in: Array.isArray(subject) ? subject : [subject] } } : {},
        difficulty ? { difficulty: { $in: Array.isArray(difficulty) ? difficulty : [difficulty] } } : {},
        courses_tag ? { courses_tag: { $in: Array.isArray(courses_tag) ? courses_tag : [courses_tag] } } : {},
        create_date ? { create_date: { $gt: new Date(create_date) } } : {},
      ],
    },
  };
  pipeline.push(matchStage);

  const lookupStages = [];

  if (topic) {
    lookupStages.push({
      $lookup: {
        from: 'topics',
        localField: 'topic',
        foreignField: '_id',
        as: 'topic',
      },
    });
  }

  if (chapter) {
    lookupStages.push({
      $lookup: {
        from: 'chapters',
        localField: 'chapter',
        foreignField: '_id',
        as: 'chapter',
      },
    });
  }

  if (subject) {
    lookupStages.push({
      $lookup: {
        from: 'subjects',
        localField: 'subject',
        foreignField: '_id',
        as: 'subject',
      },
    });
  }

  if (courses_tag) {
    lookupStages.push({
      $lookup: {
        from: 'coursestags',
        localField: 'courses_tags',
        foreignField: '_id',
        as: 'courses_tags',
      },
    });
  }

  // Add dynamic lookup stages to the pipeline
  pipeline.push(...lookupStages);

  const questions = await Question.aggregate(pipeline);

  if (!questions) {
    throw new ErrorResolver('Question List Cant Retrived', 500);
  }

  res.status(200).json({
    success: true,
    message: 'Questions List',
    questions,
    statusCode: '200',
  });
});

// exports.queryQuestion = asyncHandler(async (req, res, next) => {
//   const {
//     id,
//     status,
//     topic,
//     chapter,
//     subject,
//     difficulty,
//     courses_tag,
//     create_date,
//   } = req.query;

//   var query = {};
//   if (id) query._id = id;
//   if (subject) query.subject = subject;
//   if (chapter) query.chapter = chapter;
//   if (topic) query.topic = topic;
//   if (status) query.status = status;
//   if (difficulty) query.difficulty = difficulty;
//   if (courses_tag) query.courses_tag = courses_tag;

//   if (create_date) {
//     query = { $gt: new Date(create_date) };
//   }

//   const questions = await Question.find(query)
//     .populate('topic')
//     .populate('chapter')
//     .populate('subject')
//     .populate('created_by')
//     .populate('courses_tags');

//   res.status(200).json({
//     success: true,
//     message: 'Questions List',
//     questions,
//     statusCode: '200',
//   });
// });

exports.textSearch = asyncHandler(async (req, res, next) => {
  const { textToSearch } = req.body;
  let IsQuestionFound = false;
  IsQuestionFound = await Question.find({
    $text: { $search: textToSearch },
  }).count();

  if (IsQuestionFound > 0) {
    res.status(200).json({
      success: true,
      message: `${IsQuestionFound} Questions Found`,
      IsQuestionFound: true,
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

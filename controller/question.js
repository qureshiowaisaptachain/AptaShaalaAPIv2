const asyncHandler = require('../middleware/asynHandler');
const Question = require('../model/questions');
const ErrorResolver = require('../utility/errorResolver');
const mongoose = require('mongoose');
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

// working frontend test
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
    paginationData: req.paginationData,
    message: 'Questions List',
    questions,
    statusCode: '200',
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

  const pipeline = [];

  const matchStage = {
    $match: {
      $and: [ 
        id ? { _id: { $in: id.split(',').map((id) => new mongoose.Types.ObjectId(id)) } }: {},
        status ? { status: { $in: status.split(',').map((status) =>  status) } } : {},
        topic ? { topic: { $in:  topic.split(',').map((topic) =>  new mongoose.Types.ObjectId(topic))  } } : {},
        chapter ? { chapter: { $in: chapter.split(',').map((chapter) =>  new mongoose.Types.ObjectId(chapter))} } : {},
        subject ? { subject: { $in: subject.split(',').map((subject) => new mongoose.Types.ObjectId(subject)) } } : {},
        difficulty ? { difficulty: {  $in: difficulty.split(',').map((difficulty) =>  parseInt(difficulty)) } }: {},
        courses_tag ? { courses_tag: { $in: courses_tag.split(',').map((courses_tag) => new mongoose.Types.ObjectId(courses_tag)) } } : {},
        create_date ? { create_date: { $gt: new Date(create_date) } } : {},
      ],
    },
  };
  pipeline.push(matchStage);

  const lookupStages = [];

  lookupStages.push({
    $lookup: {
      from: 'topics',
      localField: 'topic',
      foreignField: '_id',
      as: 'topicSingle'
    }
  });
  
  lookupStages.push({
    $lookup: {
      from: 'chapters',
      localField: 'chapter',
      foreignField: '_id',
      as: 'chapterSingle'
    }
  });
  
  lookupStages.push({
    $lookup: {
      from: 'subjects',
      localField: 'subject',
      foreignField: '_id',
      as: 'subjectSingle'
    }
  });
  
  lookupStages.push({
    $lookup: {
      from: 'courses',
      localField: 'courses_tags',
      foreignField: '_id',
      as: 'coursesTagsSingle'
    }
  });
  
  // Unwind the arrays before using $arrayElemAt
  lookupStages.push({ $unwind: '$topicSingle' });
  lookupStages.push({ $unwind: '$chapterSingle' });
  lookupStages.push({ $unwind: '$subjectSingle' });
  lookupStages.push({ $unwind: '$coursesTagsSingle' });
  
  // Extract the first element from each array
  lookupStages.push({ $addFields: { topicSingle: '$topicSingle' } });
  lookupStages.push({ $addFields: { chapterSingle: '$chapterSingle' } });
  lookupStages.push({ $addFields: { subjectSingle: '$subjectSingle' } });
  lookupStages.push({ $addFields: { coursesTagsSingle: '$coursesTagsSingle' } });
  

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

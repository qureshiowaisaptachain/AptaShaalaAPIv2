const mongoose = require('mongoose');
const { subject, topic, chapter } = require('../model/subjects');
const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: Number,
    required: [true],
  },
  options: {
    type: [String],
    required: [true],
  },
  //filter
  status: {
    type: String,
    enum: ['approved', 'rejected', 'awaited'],
    required: [true],
  },
  //filter
  difficulty: {
    type: Number,
    enum: [1, 2, 3],
    required: [true],
  },
  //filter
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  hint: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  //filter
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'super_org_user' },
  //filter
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'super_org_user' },
  approved_date: {
    type: Date,
    default: Date.now,
  },
  //filter
  course_tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
});

// above approve date is and approve by data is placeholder
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

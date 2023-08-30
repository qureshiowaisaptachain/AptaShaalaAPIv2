const mongoose = require('mongoose');
const QuesitonPaperSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true],
  },
  negative_levels: {
    type: [String],
    required: [true],
  },
  instructions: {
    type: String,
  },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  pdf: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  max_marks: {
    type: Number,
    required: true,
  },
  no_of_questions: {
    type: Number,
    required: true,
  },
  course_test_type: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Approved', 'Rejected', 'Awaited'],
    required: [true],
  },
  created_date: { type: Date },
  approved_date: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'super_org_user' },
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'super_org_user' },
  course_tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
});

// above approve date is and approve by data is placeholder
const QuesitonPaper = mongoose.model('QuesitonPaper', QuesitonPaperSchema);
module.exports = QuesitonPaper;

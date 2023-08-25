const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: [Number],
    required: [true],
  },
  options: {
    type: [String],
    required: [true],
  },
  difficulty: {
    type: Number,
    required: [true],
  },
  topic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  chapter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  hint: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date, 
    default: Date.now
  },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'super_org_user' },
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'super_org_user' },
  approved_date: {  
    type: Date, 
    default: Date.now
  },
});

// above approve date is and approve by data is placeholder
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    lowercase: true,
    trim: true,
    unique: false,
    required: true,
  },
  answer: {
    type: [String],
    required: [true],
    select: false,
  },
  options: {
    type: [String],
    required: [true],
  },
  difficulty: {
    type: Number,
    required: [true],
    enum: [0, 1, 2],
    validate: {
      validator: function (value) {
        return [0, 1, 2].includes(value);
      },
      message: 'Value for question/dificulty must be 0, 1, or 2.',
    },
  },
  related_exams: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true],
  },
  topic: {
    type: [String],
    required: [true],
  },
  hint: {
    type: String,
    required: [true],
  },
  create_date: {
    type: String,
    required: [true],
  },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

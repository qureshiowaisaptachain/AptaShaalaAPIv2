const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  answer: {
    type: [String],
    required: [true],
    select: false,
  },
  options: {
    type: [String],
  },
  difficulty: {
    type: Number,
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
  },
  topic: {
    type: [String],
  },
  hint: {
    type: String,
  },
  create_data: {
    type: String,
  },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

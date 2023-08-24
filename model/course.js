const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  course: {
    type: String,
    lowercase: true,
    trim: true,
    unique: false,
    required: true,
  },
  test_details: [
    {
      test_test: { type: String },
      no_of_questions: { type: String },
      time: { type: Date },
      max_marks: { type: Number },
    },
  ],
});

const Course = mongoose.model('Course',courseSchema);
module.exports = Course;

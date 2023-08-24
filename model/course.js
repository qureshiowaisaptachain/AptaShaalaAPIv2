const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  course: {
    type: String,
  },
  types_of_tests: [
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

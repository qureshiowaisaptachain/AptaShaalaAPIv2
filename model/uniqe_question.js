const mongoose = require('mongoose');

const uniqueQuestionUsedSchema = mongoose.Schema({
  sub_domain: {
    type: String,
  },
  used_question: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Chapter',
  },
});

const uniqueQuestionUsed = mongoose.model('uniqueQuestionUsed', uniqueQuestionUsedSchema);
module.exports = uniqueQuestionUsed;

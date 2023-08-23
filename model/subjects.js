const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
  name: String,
});

const Topic = mongoose.model('Topic', topicSchema);

const chapterSchema = mongoose.Schema({
  name: String,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
});

const Chapter = mongoose.model('Chapter', chapterSchema);

const subjectSchema = mongoose.Schema({
  name: String,
  description: String,
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = { Subject, Chapter, Topic };

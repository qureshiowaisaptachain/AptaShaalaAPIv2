const asyncHandler = require('../middleware/asynHandler');
const { Topic } = require('../model/subjects');
const ErrorResolver = require('../utility/errorResolver');

exports.getTopics = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw new ErrorResolver('name missing');
  }

  const topic = Topic.create({ name: name });

  const result = await Topic.insert(topic);

  if (!result) {
    throw new ErrorResolver('subject not found', 404);
  }

  res.status(200).json({ message: 'subjects list', result });
});

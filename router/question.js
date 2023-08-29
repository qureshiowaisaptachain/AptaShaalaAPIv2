const express = require('express');
const {
  addQuestion,
  getQuestion,
  queryQuestion,
} = require('../controller/question');
const { protect, authorize } = require('../middleware/authorization');
const Question = require('../model/questions');
// # Question Papers
// GET /v1/organizations/:orgId/question-papers
// GET /v1/organizations/:orgId/question-papers/:paperId
// POST /v1/organizations/:orgId/question-papers
// PUT /v1/organizations/:orgId/question-papers/:paperId
// DELETE /v1/organizations/:orgId/question-papers/:paperId

const router = express.Router();
router.post('/', protect, authorize(['CreateQuestion']), addQuestion);
router.get('/', protect, authorize(['ReadQuestion']), getQuestion);
router.get('/queryQuestion', protect, authorize(['ReadQuestion']), queryQuestion);
module.exports = router;
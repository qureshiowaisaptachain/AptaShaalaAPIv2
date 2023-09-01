const express = require('express');
const {
  addQuestion,
  getQuestion,
  queryQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controller/question');
const { pagination } = require('../middleware/pagination');
const Question = require('../model/questions');
const { protect, authorize } = require('../middleware/authorization');

const router = express.Router();
router.post('/', protect, authorize(['CreateQuestion']), addQuestion);
// router.get('/', protect, authorize(['ReadQuestion']), getQuestion);
router.get('/', protect, authorize(['ReadQuestion']), queryQuestion);
router.get('/pagination',pagination(Question),protect,authorize(['ReadQuestion']),queryQuestion);
router.put('/', protect, authorize(['UpdateQuestion']), updateQuestion);
router.delete('/', protect, authorize(['DeleteQuestion']), deleteQuestion);

module.exports = router;

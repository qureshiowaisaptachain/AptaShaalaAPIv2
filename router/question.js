const express = require('express');
const {
  addQuestion,
  getQuestion,
  queryQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controller/question');
const { protect, authorize } = require('../middleware/authorization');

const router = express.Router();
router.post('/', protect, authorize(['CreateQuestion']), addQuestion);
router.get('/', protect, authorize(['ReadQuestion']), getQuestion);
router.get(
  '/queryQuestion',
  protect,
  authorize(['ReadQuestion']),
  queryQuestion
);
router.put('/update', protect, authorize(['UpdateQuestion']), updateQuestion);
router.delete(
  '/delete',
  protect,
  authorize(['DeleteQuestion']),
  deleteQuestion
);

module.exports = router;
const express = require('express');
const {
  addQuestion,
  queryQuestion,
  updateQuestion,
  deleteQuestion,
  textSearch,
  paginationQueryQuestion,
} = require('../controller/question');
const { pagination } = require('../middleware/pagination');
const Question = require('../model/questions');
const { protect, authorize } = require('../middleware/authorization');

const router = express.Router();
router.post('/', protect, authorize(['CreateQuestion']), addQuestion);
router.get('/', protect, authorize(['ReadQuestion']), queryQuestion);
// router.get(
//   '/staging',
//   pagination(Question),
//   protect,
//   authorize(['ReadQuestion']),
//   paginationQueryQuestion
// );
router.put('/', protect, authorize(['UpdateQuestion']), updateQuestion);
router.delete('/', protect, authorize(['DeleteQuestion']), deleteQuestion);
router.post('/search', protect, authorize(['ReadQuestion']), textSearch);
module.exports = router;

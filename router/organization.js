const express = require('express');
const { addQuestion, getQuestion } = require('../controller/question');
const { protect, authorize } = require('../middleware/authorization');

const router = express.Router();
router.post('/', protect, authorize(['CreateQuestion']), addQuestion);
router.get('/', protect, authorize(['ReadQuestion']), getQuestion);
module.exports = router;

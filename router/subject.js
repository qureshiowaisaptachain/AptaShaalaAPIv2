const express = require('express');
const { getSubjects } = require('../controller/subject');
const { protect, authorize } = require('../middleware/authorization');

const router = express.Router();
router.get('/', protect, authorize(['getSubject']), getSubjects);
module.exports = router;

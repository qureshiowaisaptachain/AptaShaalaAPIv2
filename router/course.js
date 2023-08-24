const express = require('express');
const { getCourses } = require('../controller/course');

const router = express.Router();
router.get('/',  getCourses);
module.exports = router;

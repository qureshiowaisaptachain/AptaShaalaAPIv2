const { uploadImage } = require('../controller/imageUpload/imageUpload');
const { protect, authorize } = require('../middleware/authorization');
const express = require('express');

const router = express.Router();

router.post('/upload', protect, authorize(['uploadImage']), uploadImage);
module.exports = router;

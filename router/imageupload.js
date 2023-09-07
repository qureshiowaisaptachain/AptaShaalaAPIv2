const { uploadImage } = require('../controller/imageUpload/imageUpload');
const express = require('express');

const router = express.Router();

router.post('/upload', uploadImage);
module.exports = router;


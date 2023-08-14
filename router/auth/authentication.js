const express = require('express');
const { singIn } = require('../../controller/auth/authentication');

const router = express.Router();
router.post('/signin', singIn);
module.exports = router


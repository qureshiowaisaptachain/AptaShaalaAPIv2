const express = require('express');
const { signIn } = require('../../controller/auth/authentication');

const router = express.Router();
router.post('/signin', signIn);
module.exports = router


const express = require('express');
const {
  login,
  register,
  get_otp,
  passwordReset,
  loginwithotp,
  passwordResetForDev
} = require('../../controller/auth/authentication');

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.post('/get-otp', get_otp);
router.post('/reset-password', passwordReset);
router.post('/otp-loging', loginwithotp);
router.post('/paaswordReset',passwordResetForDev)
module.exports = router;

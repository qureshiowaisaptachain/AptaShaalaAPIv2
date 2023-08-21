const express = require('express');
const { login, register,get_otp,validate_otp,passwordReset, loginwithotp } = require('../../controller/auth/authentication');
// const {protect,authorize} = require('../../middleware/authorization')

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.post('/get-otp', get_otp);
router.post('/validate-otp',validate_otp);
router.post('/reset-password',passwordReset);
router.post('/otp-loging',loginwithotp);
module.exports = router;

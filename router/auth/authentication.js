const express = require('express');
const { login, register,example } = require('../../controller/auth/authentication');
const {protect,authorize} = require('../../middleware/authorization')

const router = express.Router();
router.post('/login', login);
router.post('/register', register);

router.post('/deletequestion',protect,authorize('organization'),example)


module.exports = router;


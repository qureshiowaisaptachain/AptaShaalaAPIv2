// all and any kind of changes for data in only controller

/* below add any todo that need to be done 
 > add validation of req body
*/
const user = require('../../model/user');
const ErrorResolver = require('../../utility/errorResolver');
const asyncHandler = require('../../middleware/asynHandler');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utility/util');

exports.login = asyncHandler(async (req, res, next) => {
  const { email_id, password } = req.body;
  if (!email_id) {
    throw new ErrorResolver('Email id missing', 400);
  } else if (!password) {
    throw new ErrorResolver('Password missing', 400);
  }
  const account = await user
    .findOne({
      email: email_id,
    })
    .select('+password');

  if (!account) {
    throw new ErrorResolver('Account Does Not Exist', 403);
  }

  const isAccess = await bcrypt.compare(password, account.password);

  if (!isAccess) {
    throw new ErrorResolver('Invalid username or Password', 403);
  }

  const token = createToken(account);
  res.status(200).json({ succsess: true, token });
});

exports.register = asyncHandler(async (req, res, next) => {
  const { email_id, password } = req.body;
  if (!email_id) {
    throw new ErrorResolver('email id missing', 400);
  } else if (!password) {
    throw new ErrorResolver('Password missing', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const account = await user.create({
    email: email_id,
    password: hashedPassword,
  });

  if (!account) {
    throw new ErrorResponse('Unable to Register', 401);
  }
  const token = createToken(account);

  res.status(201).json({
    success: true,
    token: token,
  });
});

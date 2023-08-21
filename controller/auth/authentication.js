// all and any kind of changes for data in only controller

/* below add any todo that need to be done 
 > add validation of req body
*/
require('dotenv').config();
const nodemailer = require('nodemailer');
const user = require('../../model/auth/user');
const ErrorResolver = require('../../utility/errorResolver');
const asyncHandler = require('../../middleware/asynHandler');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utility/helper');
const Redis = require('ioredis');
const RedisClient = new Redis(process.env.REDIS_URI);
const jwt = require('jsonwebtoken');

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
  res.status(200).json({
    succsess: true,
    token,
    statusCode: 200,
    message: 'User Login Succsessfully',
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  const {
    email_id,
    password,
    roles,
    lastname,
    firstname,
    gender,
    phonenumber,
  } = req.body;
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
    roles: roles,
    lastname: lastname,
    firstname: firstname,
    gender: gender,
    phonenumber: phonenumber,
  });

  if (!account) {
    throw new ErrorResponse('Unable to Register', 401);
  }
  const token = createToken(account);

  res.status(201).json({
    success: true,
    token: token,
    message: 'User Registered Successfully',
    statusCode: 201,
  });
});

exports.get_otp = asyncHandler(async (req, res, next) => {
  const { email_id } = req.body;
  if (!email_id) {
    throw new ErrorResolver('Email id missing', 400);
  }
  const account = await user.findOne({
    email: email_id,
  });

  if (!account) {
    throw new ErrorResolver('Account Does Not Exist', 403);
  }

  const OTP = parseInt(Math.random() * 10000);
  await RedisClient.setex(email_id,900,OTP);
  await redis.setex(key, expirationInSeconds, value);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'techlover771@gmail.com',
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  let message = {
    from: process.env.EMAIL,
    to: email_id,
    subject: 'OTP',
    text: `${OTP}`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      next(new ErrorResolver(error.message, 300));
    } else {
      res
        .status(200)
        .json({ succsess: true, message: 'OTP Send Via Email SuccessFully ' });
    }
  });
});

exports.validate_otp = asyncHandler(async (req, res, next) => {
  const { email_id, userEnterOTP } = req.body;

  if (!email_id) {
    throw new ErrorResolver('Email id missing', 400);
  } else if (!userEnterOTP) {
    throw new ErrorResolver('OTP Is Missing', 400);
  }

  const account = await user.findOne({
    email: email_id,
  });

  if (!account) {
    throw new ErrorResolver('Account Does Not Exist', 403);
  }

  const otpMappedToEmail = await RedisClient.get(email_id);

  if (parseInt(otpMappedToEmail) === parseInt(userEnterOTP)) {
    token = jwt.sign(
      { id: account._id, isValidated: true },
      process.env.RESET_JWT_SECRET,
      {
        expiresIn: process.env.RESET_JWT_EXPIRE,
      }
    );
    res.status(200).json({
      statusCode: 200,
      succsess: true,
      message: 'User Is Validated',
      passwordResetToken: token,
    });
  } else {
    throw new ErrorResolver('Incorrect OTP', 300);
  }
});

// get otp - >   1245 -> validat -> send reset token with 15m or allow loing

exports.passwordReset = asyncHandler(async (req, res, next) => {
  const { passwordResetToken, newPassword } = req.body;
  const decodeResetToken = jwt.verify(
    passwordResetToken,
    process.env.RESET_JWT_SECRET
  );

  if (decodeResetToken.isValidated) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const filter = { _id: decodeResetToken.id };
    var account = await user.findOneAndUpdate(
      filter,
      { password: hashedPassword },
      { new: true }
    );
  }

  if (!account) {
    throw new ErrorResolver('User Password Is Not Updated', 400);
  }

  res.status(200).json({
    success: true,
    message: 'password updated',
    statusCode: 200,
  });
});

exports.loginwithotp = asyncHandler(async (req, res, next) => {
  const { email_id, otpAccessToken } = req.body;
  if (!email_id || !otpAccessToken) {
    throw new ErrorResolver('Required Argument Missing', 400);
  }

  const decodeResetToken = jwt.verify(
    otpAccessToken,
    process.env.RESET_JWT_SECRET
  );

  if (!decodeResetToken.isValidated) {
    throw ErrorResolver('Credential Incorrect', 403);
  }

  const account = await user.findOne({
    email: email_id,
  });

  if (!account) {
    throw new ErrorResolver('Token Expired or Account Does Not Exist', 403);
  }

  const tokeAccount = await user.findOne({
    _id: decodeResetToken.id,
  });

  if (!(account.email == tokeAccount.email)) {
    throw ErrorResolver('Credential Incorrect', 403);
  }

  const token = createToken(account);
  res.status(200).json({
    succsess: true,
    token,
    statusCode: 200,
    message: 'User Login Succsessfully',
  });
});

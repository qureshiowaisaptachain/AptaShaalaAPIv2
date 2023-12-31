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
  await RedisClient.setex(email_id, 900, OTP);

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
      res.status(200).json({
        succsess: true,
        OTP,
        message: 'OTP Send Via Email SuccessFully ',
      });
    }
  });
});

exports.passwordReset = asyncHandler(async (req, res, next) => {
  const { email_id, OTP, newPassword } = req.body;

  if (!email_id || !OTP || !newPassword) {
    throw new ErrorResolver('Required Argument Missing', 401);
  }

  const account = await user.findOne({
    email: email_id,
  });

  if (!account) {
    throw new ErrorResolver('Account Does Not Exist', 401);
  }

  const otpMappedToEmail = await RedisClient.get(email_id);

  if (!(parseInt(otpMappedToEmail) === parseInt(OTP))) {
    throw new ErrorResolver('Incorrect OTP or OTP Expired', 401);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const filter = { email: email_id };
  var updatePassword = await user.findOneAndUpdate(
    filter,
    { password: hashedPassword },
    { new: true }
  );

  if (!updatePassword) {
    throw new ErrorResolver('Password Update Failed', 500);
  } else {
    await RedisClient.set(email_id, null);
  }

  res.status(200).json({
    statusCode: 200,
    succsess: true,
    message: 'Password is updated',
  });
});

exports.loginwithotp = asyncHandler(async (req, res, next) => {
  const { email_id, otp } = req.body;

  const account = await user.findOne({
    email: email_id,
  });

  if (!account) {
    throw new ErrorResolver('Token Expired or Account Does Not Exist', 403);
  }

  const otpMappedToEmail = await RedisClient.get(email_id);

  if (!(parseInt(otpMappedToEmail) === parseInt(otp))) {
    throw new ErrorResolver('Incorrect OTP', 300);
  }

  const token = createToken(account);
  res.status(200).json({
    succsess: true,
    login: token,
    statusCode: 200,
    message: 'User Login Succsessfully',
  });
});

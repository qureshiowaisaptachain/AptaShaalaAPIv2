const roles = {
  superAdmin: ['organization', 'student', 'question', 'questionPaper'],
  questionCreator: ['question', 'student'],
};

const jwt = require('jsonwebtoken');
const ErrorResolver = require('../utility/errorResolver');
const user = require('../model/user');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ErrorResolver(`Unauthorize Access`, 403);
  }
  let decoded = jwt.verify(token, process.env.JWT_SECRET);

  const account = await user.findById(decoded.id);

  if (account) {
    req.user = account;
    next();
  }

  if (!account) {
    throw new ErrorResolver('User Not Found', 500);
  }
};

exports.authorize = (...permission) => {
  return (req, res, next) => {
    var token = false;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      next(new ErrorResolver(`Issue With Access Token`, 403));
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let accountpermission = [];

    decoded.role.forEach((role) => {
      accountpermission.push(roles[role]);
    });

    accountpermission.forEach((account) => {
      permission.forEach((per) => {
        if (account.includes(per)) {
          next();
        } else {
          next(new ErrorResolver('role does not have permission', 401));
        }
      });
    });
  };
};

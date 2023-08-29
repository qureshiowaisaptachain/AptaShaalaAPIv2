// pemmission from db and populate them in this roles object
const roles = {
  superAdmin: [
    'ReadQuestion',
    'CreateQuestion',
    'UpdateQuestion',
    'DeleteQuestion',
    'CreateCourse',
    'getSubject',
  ],
  questionCreator: [
    'ReadQuestion',
    'CreateQuestion',
    'UpdateQuestion',
    'DeleteQuestion',
  ],
};

const jwt = require('jsonwebtoken');
const ErrorResolver = require('../utility/errorResolver');
const super_org_user = require('../model/auth/super_org_user');

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

  const account = await super_org_user.findById(decoded.id);

  if (!account) {
    throw new ErrorResolver('Unauthorize Access', 403);
  }

  req.user = account;
  next();
};

exports.authorize = (permission) => {
  return (req, res, next) => {
    var token = false;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ErrorResolver(`Unauthorize Access`, 403));
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new ErrorResolver(`Unauthorize Access`, 403));
    }
    let accountPermission = [];

    decoded.role.forEach((role) => {
      accountPermission.push(roles[role]);
    });

    if (accountPermission[0].includes(permission[0])) {
      req.userID = decoded.id;
      return next();
    } else {
      return next(new ErrorResolver('Unauthorize Access', 401));
    }
  };
};

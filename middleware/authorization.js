// pemmission from db and populate them in this roles object
const roles = {
  superAdmin: [
    'ReadQuestion',
    'CreateQuestion',
    'UpdateQuestion',
    'DeleteQuestion',
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
const user = require('../model/auth/user');

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
    throw new ErrorResolver('Unauthorize Access', 500);
  }
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
      return next();
    }
    {
      return next(new ErrorResolver('Unauthorize Access', 401));
    }
  };
};

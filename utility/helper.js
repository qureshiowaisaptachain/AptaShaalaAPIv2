const jwt = require('jsonwebtoken');
exports.createToken = (account) => {
  return jwt.sign(
    { id: account._id, role: account.roles },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

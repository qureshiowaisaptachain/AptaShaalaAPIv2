const jwt = require('jsonwebtoken');

exports.createToken = (account) => {
  return jwt.sign(
    { id: account._id, role: account.role },
    process.env.JWT_SECRET,  // Corrected this line
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

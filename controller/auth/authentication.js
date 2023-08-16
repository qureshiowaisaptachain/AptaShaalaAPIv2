const user = require('../../model/user');
const ErrorResolver = require('../../utility/errorResolver');

exports.signIn = async (req, res, next) => {
  try {
    const { email_id, password } = req.body;
    if (!email_id) {
      throw new ErrorResolver('email id missing', 400);
    } else if (!password) {
      throw new ErrorResolver('Password missing', 400);
    }
    const result = await user
      .findOne({
        email_id: email_id,
      })
      .select('+password');
    if (result.password === password) {
      res.status(200).json({ message: 'User Sign In', succsess: true });
    } else {
      throw new ErrorResolver('Wrong Password', 401);
    }
  } catch (err) {
    next(err);
  }
};


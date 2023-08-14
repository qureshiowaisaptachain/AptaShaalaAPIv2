const user = require('../../model/user');
const errorResolver = require('../../utility/errorResolver');

exports.singIn = async (req, res, next) => {
  try {
    const { email_id, password } = req.body;
    if (!email_id) {
      throw new errorResolver('email id missing', 400);
    } else if (!password) {
      throw new errorResolver('Password missing', 400);
    }
    const result = await user
      .findOne({
        email_id: email_id,
      })
      .select('+password');
    if (result.password === password) {
      res.status(200).json({ message: 'User Sign In', succsess: true });
    } else {
      throw new errorResolver('Wrong Password', 401);
    }
  } catch (error) {
    next(error);
  }
};

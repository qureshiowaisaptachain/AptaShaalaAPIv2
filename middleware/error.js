const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    succsess: false,
    statusCode: err.statusCode|| 500,
    message: err.message || 'Undefined Error!',
  });
};

module.exports = errorHandler;

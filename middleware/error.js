const errorHandler = (err, req, res, next) => {
  console.log(err);

    res.status(err.statusCode || 500).json({
      succsess: false,
      message: err.message || 'Undefined Error!',
    });
};

module.exports = errorHandler;

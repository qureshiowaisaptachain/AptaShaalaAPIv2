const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(error.statusCode || 500).json({
        success: false,
        msg: err.message || 'Undefined Error'
    });
};

module.exports = errorHandler;

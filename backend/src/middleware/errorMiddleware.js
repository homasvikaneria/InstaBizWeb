const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  
  return res.status(statusCode).json({
    success: false,
    message: err.statusCode ? err.message : 'Internal server error'
  });
};

module.exports = errorHandler;

const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const [value] = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data:- ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// eslint-disable-next-line no-unused-vars
const handleJWTError = () =>
  new AppError('Invalid token, Please login again!', 401);

// eslint-disable-next-line no-unused-vars
const handleJWTExpiredError = () =>
  new AppError('Your token has expired, please login again!', 401);

const sendErrorDev = (err, req, res) => {
  // A. API
  if (req.originalUrl.startsWith('/api')) {
    console.log('Error 💥', err);

    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B. Rendered website
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A. API
  if (req.originalUrl.startsWith('/api')) {
    // 1.  Oprational Errors
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // 2. Programming or other unknown error
    console.log('Error 💥', err);

    // 2. Send generic message
    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
    });
  }

  // A. Oprational Errors
  // B. Rendered website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B. Programming or other unknown error
  // 1. Log the error to the console
  console.log('Error 💥', err);

  // 2. Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

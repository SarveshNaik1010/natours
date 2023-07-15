module.exports = function (fn) {
  // This anonymous function gets called by express
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};

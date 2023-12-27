const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { bikeId } = req.params;

  if (!isValidObjectId(bikeId)) {
    next(HttpError(400, `${bikeId} is not valid id`));
  }
  next();
};

module.exports = isValidId;

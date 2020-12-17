const { moment } = require('../utils/moment');
const errors = require('../errors/internal_codes');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: DEFAULT_STATUS_CODE,
  [errors.BAD_REQUEST]: 400,
  [errors.NOT_FOUND]: 404,
  [errors.UNAUTHORIZED]: 401
};

exports.handle = (error, _, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    next(error);
    res.status(DEFAULT_STATUS_CODE);
    error.errors = { code: '1000', message: error.message };
  }
  logger.error(error);
  return res.send({
    errors: error.errors,
    timestamp: moment().format()
  });
};

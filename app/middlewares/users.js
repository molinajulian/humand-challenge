const logger = require('../logger');
const { findUserBy } = require('../services/users');
const { invalidCredentialsError, userNotFound } = require('../errors');

exports.checkExistentUser = (req, res, next) => {
  logger.info('Checking if exist a user with the same email');
  return findUserBy({ email: req.body.email }).then(user => {
    if (user) {
      logger.info('The user already exist');
      return next(invalidCredentialsError);
    }
    return next();
  });
};

exports.checkAndLoadUser = (req, res, next) => {
  logger.info('Checking if exist a user with the same email');
  return findUserBy({ email: req.body.email }).then(user => {
    if (!user) {
      logger.info('The user does not exist');
      return next(userNotFound);
    }
    logger.info('Loading the user in the request');
    req.user = user;
    return next();
  });
};

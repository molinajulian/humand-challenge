const { randomBytes } = require('crypto');

const logger = require('../logger');
const { User } = require('../models');
const {
  session: { totpKeyBytesLength }
} = require('../../config').common;
const { databaseError } = require('../errors');

exports.generateKey = () => {
  const bytes = randomBytes(parseInt(totpKeyBytesLength));
  return bytes.toString('hex');
};

exports.createUser = data => {
  logger.info('Attempting to create an user');
  return User.create(data).catch(error => {
    logger.error('Failed creating an user. Details: ', error);
    throw databaseError(error.message);
  });
};

exports.findUserBy = condition => {
  logger.info('Attempting to get an user');
  return User.findOne({ where: condition }).catch(error => {
    logger.error('Failed getting an user. Details: ', error);
    throw databaseError(error.message);
  });
};

const { hash, genSalt, compare } = require('bcryptjs');
const {
  api: { hashingSalts }
} = require('../../config').common;
const { defaultError } = require('../errors');
const logger = require('../logger');

exports.hashString = string => {
  logger.info('Attempting to hash a string');
  return genSalt(parseInt(hashingSalts))
    .then(salt => hash(string, salt))
    .catch(err => {
      logger.error('Fail to hash a string, details:', err);
      throw defaultError(err.message);
    });
};

exports.compareString = (string, stringHashed) =>
  compare(string, stringHashed).catch(err => {
    logger.error('Fail to compare hash with the string, details:', err);
    throw defaultError(err.message);
  });

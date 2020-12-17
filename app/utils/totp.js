const { createHmac } = require('crypto');

const { moment } = require('./moment');
const logger = require('../logger');
const { times, constant } = require('./lodash');
const { totpCodeLength, totpTtlSeconds, totpAlgorithm } = require('../../config').common.session;

const completeCode = code => {
  if (code.toString().length < totpCodeLength) {
    return `${times(totpCodeLength - code.toString().length, constant(0)).join('')}${code}`;
  }
  return code;
};

exports.checkCode = ({ key, code }) => {
  logger.info('Calculating the current time');
  const currentTime = Math.floor(moment().unix() / totpTtlSeconds);
  logger.info(`The unix current time was calculated successfully and is ${currentTime}`);
  logger.info('Creating hmac');
  const hmac = createHmac(totpAlgorithm, key)
    .update(currentTime.toString())
    .digest('hex');
  logger.info(`Hmac created successfully and is: ${hmac}`);
  logger.info('Applying the dynamic truncation');
  const lastCharacter = parseInt(hmac[hmac.length - 1], 16);
  const truncation = hmac.toString().slice(lastCharacter, lastCharacter * 2) || '0';
  logger.info(`Truncation obtained successfully and is: ${truncation}`);
  const decimalTruncation = parseInt(truncation, 16);
  logger.info(`The truncation decimal value is: ${decimalTruncation}`);
  // eslint-disable-next-line no-mixed-operators
  const expectedCode = completeCode(decimalTruncation % 10 ** totpCodeLength);
  logger.info(`Expected code obtained and is: ${expectedCode}`);
  return parseInt(expectedCode) === code;
};

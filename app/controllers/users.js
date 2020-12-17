const { generateKey, createUser, findUserBy } = require('../services/users');
const { hashString, compareString } = require('../utils/bcrypt');
const { checkCode } = require('../utils/totp');
const { createToken } = require('../utils/jwt');
const logger = require('../logger');
const { invalidCredentialsError, invalidPasswordCodeError } = require('../errors');

exports.createUser = ({ body: { email, password } }, res, next) =>
  hashString(password)
    .then(passwordHashed => {
      logger.info('Password hashed successfully');
      logger.info('Generating random key');
      const key = generateKey();
      logger.info('Random key generated successfully');
      return createUser({ email, password: passwordHashed, totpKey: key }).then(() =>
        res.status(201).send({ key })
      );
    })
    .catch(next);

exports.userLogin = ({ user, body: { password, code }, res, next }) =>
  compareString(password, user.password)
    .then(IsThePasswordCorrect => {
      if (!IsThePasswordCorrect) {
        logger.error('The passwords are different');
        throw invalidCredentialsError;
      }
      logger.info('Password checked. Checking the code');
      return checkCode({ key: user.totpKey, code });
    })
    .then(isValidCode => {
      if (!isValidCode) {
        logger.error('The password code is invalid');
        throw invalidPasswordCodeError;
      }
      logger.info('The code is valid. Generating the token');
      return createToken({ id: user.id, email: user.email });
    })
    .then(token => {
      logger.info('Token generated successfully');
      return res.send({ token });
    })
    .catch(next);

exports.getUserData = ({ userId }, res, next) =>
  findUserBy({ id: userId })
    .then(user => res.send({ email: user.email }))
    .catch(next);

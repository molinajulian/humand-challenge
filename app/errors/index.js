const codes = require('./codes');
const internalCodes = require('./internal_codes');

const buildError = ({ code, message, internalCode }) => {
  const errors = [{ message, code }];
  return { errors, internalCode };
};

exports.databaseError = message =>
  buildError({ code: codes.DATABASE_ERROR, message, internalCode: internalCodes.DATABASE_ERROR });

exports.defaultError = message =>
  buildError({ code: codes.DEFAULT_ERROR, message, internalCode: internalCodes.DEFAULT_ERROR });

exports.invalidParamsError = errors => ({ internalCode: internalCodes.BAD_REQUEST, errors });

exports.invalidCredentialsError = buildError({
  code: codes.ALREADY_EXIST_USER,
  internalCode: internalCodes.BAD_REQUEST,
  message: 'The credentials are invalid'
});

exports.userNotFound = buildError({
  code: codes.USER_NOT_FOUND,
  internalCode: internalCodes.NOT_FOUND,
  message: 'The provided user does not exist'
});

exports.invalidPasswordCodeError = buildError({
  code: codes.INVALID_PASSWORD_CODE,
  internalCode: internalCodes.BAD_REQUEST,
  message: 'The provided code is invalid'
});

exports.invalidTokenError = buildError({
  code: codes.UNAUTHORIZED,
  internalCode: internalCodes.UNAUTHORIZED,
  message: 'The provided token is invalid'
});

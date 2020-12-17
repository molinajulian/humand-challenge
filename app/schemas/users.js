const { BODY_EMAIL, BODY_PASSWORD, BODY_CODE, HEADER_JWT } = require('./errors_catalog');
const { headerName } = require('../../config').common.session;

exports.createUserSchema = {
  email: {
    in: ['body'],
    isEmail: true,
    trim: true,
    errorMessage: BODY_EMAIL
  },
  password: {
    in: ['body'],
    isString: true,
    isLength: { options: { min: 8, max: 20 } },
    errorMessage: BODY_PASSWORD
  }
};

exports.usersLoginSchema = {
  ...exports.createUserSchema,
  code: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: BODY_CODE
  }
};

exports.authenticateSchema = {
  [headerName]: {
    in: ['headers'],
    isJWT: true,
    errorMessage: HEADER_JWT
  }
};

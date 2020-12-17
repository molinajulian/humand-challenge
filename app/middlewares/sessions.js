const { checkToken } = require('../utils/jwt');
const { headerName } = require('../../config').common.session;
const { invalidTokenError } = require('../errors');

exports.checkSessionToken = (req, res, next) => {
  try {
    const token = checkToken(req.headers[headerName]);
    req.userId = token.id;
    return next();
  } catch (error) {
    return next(invalidTokenError);
  }
};

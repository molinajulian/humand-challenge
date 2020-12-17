const { checkSchema, validationResult } = require('express-validator');
const { uniq } = require('../utils/lodash');
const { invalidParamsError } = require('../errors');

const formatValidationErrors = validationErrors =>
  uniq(validationErrors.array({ onlyFirstError: true }).map(e => e.msg));

const throwValidationErrors = (req, _, next) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors.errors[0]);
  return next(!validationErrors.isEmpty() && invalidParamsError(formatValidationErrors(validationErrors)));
};

exports.validateSchema = schema => checkSchema(schema);

exports.validateSchemaAndFail = schema => [exports.validateSchema(schema), throwValidationErrors];

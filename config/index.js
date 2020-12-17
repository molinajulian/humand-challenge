const ENVIRONMENT = process.env.NODE_ENV || 'development';

// eslint-disable-next-line global-require
if (ENVIRONMENT !== 'production') require('dotenv').config();

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep immutable copy of source object into tarjet object and returns a new object.
 */
const deepMerge = (target, source) => {
  if (isObject(target) && isObject(source)) {
    return Object.keys(source).reduce(
      (output, key) => ({
        ...output,
        [key]: isObject(source[key]) && key in target ? deepMerge(target[key], source[key]) : source[key]
      }),
      { ...target }
    );
  }
  return target;
};

const config = {
  common: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      nameTest: process.env.DB_NAME_TEST
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT || 1024 * 1024 * 10,
      parameterLimit: process.env.API_PARAMETER_LIMIT || 10000,
      port: process.env.PORT || 8080,
      timezoneMoment: process.env.MOMENT_TIMEZONE || 'America/Argentina/Buenos_Aires',
      hashingSalts: process.env.HASHING_SALTS || 10
    },
    session: {
      headerName: process.env.SESSION_HEADER_NAME || 'authorization',
      totpAlgorithm: process.env.TOTP_ALGORITHM || 'sha1',
      totpCodeLength: parseInt(process.env.TOTP_CODE_LENGTH || 6),
      totpTtlSeconds: parseInt(process.env.TOTP_TTL_SECONDS || 30),
      totpKeyBytesLength: parseInt(process.env.TOTP_KEY_BYTES_LENGTH || 60),
      jwtSecret: process.env.JWT_SECRET || 'secret',
      jwtExpireSeconds: parseInt(process.env.JWT_EXPIRE_SECONDS || 3600)
    }
  }
};

const customConfig = require(configFile).config;
module.exports = deepMerge(config, customConfig);

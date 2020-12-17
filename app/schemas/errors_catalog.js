const { headerName } = require('../../config').common.session;

const genericMessage = ({ property, location, type = 'string' }) =>
  `${property} must be ${type}${location ? `, not empty and must be contained in ${location}` : ''}`;

module.exports = {
  BODY_EMAIL: {
    code: '4100',
    message: genericMessage({ property: 'email', location: 'body', type: 'a valid email' })
  },
  BODY_PASSWORD: {
    code: '4101',
    message: genericMessage({ property: 'password', location: 'body', type: 'string' })
  },
  BODY_CODE: {
    code: '4102',
    message: genericMessage({ property: 'code', location: 'body', type: 'integer' })
  },
  HEADER_JWT: {
    code: '4103',
    message: genericMessage({ property: headerName, location: 'headers', type: 'jwt token' })
  }
};

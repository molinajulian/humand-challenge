const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpireSeconds } = require('../../config').common.session;

exports.createToken = (payload = {}) => jwt.sign(payload, jwtSecret, { expiresIn: jwtExpireSeconds });

exports.checkToken = token => jwt.verify(token, jwtSecret);

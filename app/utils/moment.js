const moment = require('moment-timezone');

const { timezoneMoment } = require('../../config').common.api;

moment.tz.setDefault(timezoneMoment);
exports.moment = moment;

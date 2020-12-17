const { healthCheck } = require('./controllers/health_check');
const { createUser, userLogin, getUserData } = require('./controllers/users');
const { validateSchemaAndFail } = require('./middlewares/params_validator');
const { createUserSchema, usersLoginSchema, authenticateSchema } = require('./schemas/users');
const { checkExistentUser, checkAndLoadUser } = require('./middlewares/users');
const { checkSessionToken } = require('./middlewares/sessions');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSchemaAndFail(createUserSchema), checkExistentUser], createUser);
  app.post('/users/login', [validateSchemaAndFail(usersLoginSchema), checkAndLoadUser], userLogin);
  app.get('/users/me', [validateSchemaAndFail(authenticateSchema), checkSessionToken], getUserData);
};

const jwt = require('jsonwebtoken');
const UniError = require('../utils/errors');
const { secredKey } = require('../utils/constants');
const { errorMessages } = require('../utils/messages');

module.exports = (req, res, next) => {
  const bearerSign = 'Bearer ';
  const { authorization } = req.headers;

  // Проверка существования авторизационных данных и соответствия их Bearer
  if (!authorization || !authorization.startsWith(bearerSign)) {
    const err = new Error(errorMessages.NOT_AUTHORIZED);
    err.name = 'AuthorizationError';
    throw (new UniError(err));
  }

  const token = authorization.replace(bearerSign, '');

  let payload;

  try {
    payload = jwt.verify(token, secredKey);
  } catch (err) {
    err.name = 'WrongTokenError';
    throw (new UniError(err));
  }

  req.user = payload;
  next();
};

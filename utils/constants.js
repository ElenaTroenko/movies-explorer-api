/* eslint no-useless-escape: 0 */

require('dotenv').config();

const { JWT_SECRET: secredKey = 'super-secred-key' } = process.env;
const urlRegex = /https?:\/\/[-a-zA-Z0-9._~:/?#\[\]@!$&'()*\+,;=]{5,}/;
const jwtExpiresIn = '7d';

const devDefaultSettings = {
  PORT: 3000,
  DB: 'mongodb://127.0.0.1:27017/bitfilmsdb',
};

const corsOptions = {
  ALLOWED_METHODS: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  ALLOWED_CORS: [
    'http://et-movies.nomoreparties.co',
    'https://et-movies.nomoreparties.co',
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  OPTIONS_OK_STATUS: 204,
};

const ERROR_CODES = {
  ValidationError: 400,
  VALIDATION_ERROR: 400,
  NotFoundError: 404,
  CastError: 400,
  MongoServerError: 409,
  WrongTokenError: 401,
  AuthorizationError: 401,
  LoginError: 401,
  AccessDeniedError: 403,
  default: 500,
};

const successCodes = {
  CREATED: 201,
};

module.exports = {
  secredKey,
  urlRegex,
  devDefaultSettings,
  jwtExpiresIn,
  corsOptions,
  successCodes,
  ERROR_CODES,
};

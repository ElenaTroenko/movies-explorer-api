/* eslint no-underscore-dangle: 0 */

// Класс универсальной ошибки. Наследует от класса Error,
// устанавливает statusCode ситуационно
class UniError extends Error {
  constructor(err) {
    super(err.message);

    this._ERROR_CODES = {
      ValidationError: 400,
      NotFoundError: 404,
      CastError: 400,
      MongoServerError: 409,
      WrongTokenError: 401,
      AuthorizationError: 401,
      LoginError: 401,
      AccessDeniedError: 403,
      default: 500,
    };

    // заполнить
    this._fillErrorCode(err);
  }

  _fillErrorCode(err) {
    let errorCode = this._ERROR_CODES.default;

    if (this._ERROR_CODES[err.name]) {
      errorCode = this._ERROR_CODES[err.name];
    }

    this.name = err.name;
    this.statusCode = errorCode;
  }
}

module.exports = UniError;

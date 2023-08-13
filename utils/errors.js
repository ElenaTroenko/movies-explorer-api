/* eslint no-underscore-dangle: 0 */

const { ERROR_CODES } = require('./constants');

// Класс универсальной ошибки. Наследует от класса Error,
// устанавливает statusCode ситуационно
class UniError extends Error {
  constructor(err) {
    super(err.message);

    this._ERROR_CODES = ERROR_CODES;

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

const UniError = require('./errors');
const { errorMessages } = require('./messages');
const { errorCodes } = require('./constants');

// шлет ошибку в ответ (res)
const sendError = (err, res) => {
  // определить принадлежность классу объекта err.
  // если не UniError - привести к UniError
  let error = err;
  if (!(err instanceof UniError)) {
    error = new UniError(err);
  }
  const { statusCode = errorCodes.DEFAULT_ERROR, message = errorMessages.DEFAULT } = error;

  // отправить ответ со статусом и сообщением
  res.status(statusCode).send({ message });
};

module.exports = { sendError };

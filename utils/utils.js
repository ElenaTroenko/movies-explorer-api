const UniError = require('./errors');
const { errorMessages } = require('./messages');

// шлет ошибку в ответ (res)
const sendError = (err, res) => {
  // определить принадлежность классу объекта err.
  // если не UniError - привести к UniError
  let error = err;
  if (!(err instanceof UniError)) {
    error = new UniError(err);
  }
  const { statusCode = 500, message = errorMessages.DEFAULT } = error;

  // отправить ответ со статусом и сообщением
  res.status(statusCode).send({ message });
};

module.exports = { sendError };

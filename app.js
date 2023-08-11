const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const UniError = require('./utils/errors');
const { sendError } = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { errorMessages } = require('./utils/messages');
const { limiter } = require('./utils/limiter');

const { devDefaultSettings } = require('./utils/constants');

require('dotenv').config();

const { PORT = devDefaultSettings.PORT } = process.env;
const { DB = devDefaultSettings.DB } = process.env;

const app = express();

// логгер запросов
app.use(requestLogger);

// json parser
app.use(bodyParser.json());

// cors-middleware
app.use(cors);
// helmet
app.use(helmet());
// limiter
app.use(limiter);

// Роутер
app.use('/', router);

// Хэндлер 404 страниц
app.use('/', () => {
  const err = new Error(errorMessages.NOT_FOUND);
  err.name = 'NotFoundError';
  throw (new UniError(err));
});

// логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());
// Централизованный бработчик ошибок
app.use((err, req, res, next) => {
  sendError(err, res);
  next();
});

// Подключение к БД
mongoose.connect(DB);

// Запуск
app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}...`);
});

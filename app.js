const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const movieRouter = require('./routes/movies');
const userRouter = require('./routes/users');

const UniError = require('./utils/errors');
const { sendError } = require('./utils/utils');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

require('dotenv').config();
const { PORT = 3000 } = process.env;
const { DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;


const app = express();


// логгер запросов
app.use(requestLogger);

app.use(bodyParser.json());

app.use(cors);                      // cors-middleware

app.use('/', userRouter);           // Роутер пользователей
app.use('/', movieRouter);          // Роутер фильмов


app.use('/', () => {                // Хэндлер 404 страниц
  throw(new UniError({name: 'DocumentNotFoundError'}, 'Страница не найдена'));
});

// логгер ошибок
app.use(errorLogger);

app.use(errors());                  // Обработчик ошибок celebrate
app.use((err, req, res, next) => {  // Централизованный бработчик ошибок
  sendError(err, res);
  next();
});

// Подключение к БД
mongoose.connect(DB);

// Запуск
app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}...`);
});
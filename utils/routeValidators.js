const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('./constants');

const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
};
const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};
const updateUserSchema = {
  body: Joi.object().keys({
    user: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
};
const createMovieSchema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
  }),
};
const deleteMovieSchema = {
  params: Joi.object().keys({
    _id: Joi.string().length(24).required(),
  }),
};

// валидатор роута создания фильма
const validateCreateMovieRoute = celebrate(createMovieSchema);

// валидатор роута удаления фильма
const validateDeleteMovieRoute = celebrate(deleteMovieSchema);

// валидатор роута создания пользователя
const validateCreateUserRoute = celebrate(createUserSchema);

// валидатор роута логина
const validateLoginUserRoute = celebrate(loginSchema);

// валидатор роута обновления информации о пользователе
const updateUserInfoRoute = celebrate(updateUserSchema);

module.exports = {
  validateCreateMovieRoute,
  validateDeleteMovieRoute,
  validateCreateUserRoute,
  validateLoginUserRoute,
  updateUserInfoRoute,
};

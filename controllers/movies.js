const mongoose = require('mongoose');
const Movie = require('../models/movies');
const { successCodes } = require('../utils/constants');
const UniError = require('../utils/errors');
const { errorMessages, successMessages } = require('../utils/messages');

// Получить все фильмы
const getMovies = (req, res, next) => {
  const owner = req.user;

  Movie.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

// Создать фильм
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  const id = req.user._id;

  const owner = new mongoose.Types.ObjectId(id);

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(successCodes.CREATED).send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

// Удалить фильм
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (movie) {
        // Проверка прав пользователя
        if (String(movie.owner._id).replace('new OwnerId("', '').replace('")', '') !== req.user._id) {
          const err = new Error(errorMessages.ACCESS_DENIED);
          err.name = 'AccessDeniedError';
          throw (new UniError(err));
        }
        // права подтверждены. фильм есть. выполняем удаление
        return Movie.findByIdAndRemove(req.params._id)
          .then((removedMovie) => {
            if (removedMovie) {
              res.send({ message: successMessages.DELETED });
            } else {
              const err = new Error(errorMessages.MOVIE_NOT_FOUND);
              err.name = 'NotFoundError';
              throw (new UniError(err));
            }
          });
      }
      // фильм не найден - отдать ошибку
      const err = new Error(errorMessages.MOVIE_NOT_FOUND);
      err.name = 'NotFoundError';
      throw (new UniError(err));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};

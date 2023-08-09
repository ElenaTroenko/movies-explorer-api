const Movie = require('../models/movies');
const mongoose = require('mongoose');
const UniError = require('../utils/errors');


// Получить все фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then(movies => res.send(movies))
    .catch((err) => next(new UniError(err, 'получение всех фильмов')));
};


// Создать фильм
const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image,
      trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  const id = req.user._id;
  const owner = new mongoose.Types.ObjectId(id);

  Movie.create({ country, director, duration, year, description, image,
      trailer, nameRU, nameEN, thumbnail, movieId, owner })
    .then(movie => res.status(201).send(movie))
    .catch((err) => next(new UniError(err, 'создание фильма')));
};


// Удалить фильм
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (movie) {
        if (String(movie.owner._id).replace('new OwnerId("', '').replace('")', '') !== req.user._id) {
          throw(new UniError({name:'AccessDeniedError'}));
        }
        // права подтверждены. фильм есть. выполняем удаление
        Movie.findByIdAndRemove(req.params._id)
          .then((movie) => {
            if (movie) {
              res.send({message: 'удалено'});
            } else {
              throw(new UniError({name: 'CastError'}));
            }
          });
      } else {
        throw(new UniError({name:'DocumentNotFoundError'}));
      }
    })
    .catch((err) => {
      next(new UniError({message: err.message, name: err.name}, 'удаление фильма'));
    });
};


module.exports = { getMovies, createMovie, deleteMovie };
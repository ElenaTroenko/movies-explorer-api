const movieRouter = require('express').Router();
const {getMovies, createMovie, deleteMovie} = require('../controllers/movies');
const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../utils/constants');


const createMovieSchema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailer: Joi.string().required().pattern(urlRegex),
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


// роуты movie
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', celebrate(createMovieSchema), createMovie);
movieRouter.delete('/movies/:_id', celebrate(deleteMovieSchema), deleteMovie);


module.exports = movieRouter;
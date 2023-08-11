const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovieRoute, validateDeleteMovieRoute } = require('../utils/routeValidators');

// роуты movie
movieRouter.get('/', getMovies);
movieRouter.post('/', validateCreateMovieRoute, createMovie);
movieRouter.delete('/:_id', validateDeleteMovieRoute, deleteMovie);

module.exports = movieRouter;

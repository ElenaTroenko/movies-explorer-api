const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateCreateUserRoute, validateLoginUserRoute } = require('../utils/routeValidators');
const { createUser, login } = require('../controllers/users');
const UniError = require('../utils/errors');
const { errorMessages } = require('../utils/messages');

// роуты user, не требующие авторизации
router.post('/signup', validateCreateUserRoute, createUser);
router.post('/signin', validateLoginUserRoute, login);

// Мидлвар-защита роутов авторизацией
router.use('/', auth);

// роуты, требующие авторизацию
router.use('/users', userRouter);
router.use('/movies', movieRouter);

// Хэндлер 404 страниц
router.use('/', () => {
  const err = new Error(errorMessages.NOT_FOUND);
  err.name = 'NotFoundError';
  throw (new UniError(err));
});

module.exports = router;

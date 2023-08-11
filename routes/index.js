const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateCreateUserRoute, validateLoginUserRoute } = require('../utils/routeValidators');
const { createUser, login } = require('../controllers/users');

// роуты user, не требующие авторизации
router.post('/signup', validateCreateUserRoute, createUser);
router.post('/signin', validateLoginUserRoute, login);

// Мидлвар-защита роутов авторизацией
router.use('/', auth);

// роуты, требующие авторизацию
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;

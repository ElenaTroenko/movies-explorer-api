const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {createUser, getUserInfo, login, updateUserInfo} = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');


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
  })
};
const updateUserSchema = {
  body: Joi.object().keys({
    user: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
};


// роуты user, не требующие авторизации
userRouter.post('/signup', celebrate(createUserSchema), createUser);
userRouter.post('/signin', celebrate(loginSchema), login);

// Мидлвар-защита роутов авторизацией
// userRouter.use('/', auth);

// роуты user
userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', celebrate(updateUserSchema), updateUserInfo);


module.exports = userRouter;
const User = require ('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UniError = require('../utils/errors');
const { secredKey } = require('../utils/constants');


// Создать пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(async (hash) => {
      try {
        await User.create({ name, email, password: hash })
          .then((user) => {
            User.findById(user._id)
              .then((user) => res.status(201).send({user}));
          });
      } catch(err) {
        next(new UniError(err, 'создание пользователя'), res);
      }
    })
    .catch((err) => {
      next(err);
    });
};


// Получить информацию о пользователе
const getUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}, 'получение пользователя'));
      }
    })
    .catch((err) => next(new UniError(err), 'получение пользователя .catch'));
};


// Логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({email})
    .select('+password')
    .then((user) => {
      if (!user) {
        throw(new UniError({name: 'LoginError'}, 'вход пользователя'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw(new UniError({name: 'LoginError'}, 'вход пользователя'));
          }
          const token = jwt.sign({_id: user._id}, secredKey, { expiresIn: '7d' });
          res.send({token});
        });
    })
    .catch(() => next(new UniError({name: 'LoginError'}, 'вход пользователя')));
};


// Обновить пользователя
const updateUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw(new UniError({name: 'DocumentNotFound'}));
      }
      res.send(user);
    })
    .catch((err) => next(new UniError(err, 'обновление пользователя')));
};


module.exports = {createUser, getUserInfo, login, updateUserInfo};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UniError = require('../utils/errors');
const { successCodes, secredKey, jwtExpiresIn } = require('../utils/constants');
const { errorMessages } = require('../utils/messages');

// Создать пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(async (hash) => {
      try {
        await User.create({ name, email, password: hash })
          .then((recordedUser) => {
            User.findById(recordedUser._id)
              .then((user) => res.status(successCodes.CREATED).send({ user }));
          });
      } catch (err) {
        next(err);
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
        const err = new Error(errorMessages.USER_NOT_FOUND);
        err.name = 'NotFoundError';
        throw (new UniError(err));
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error(errorMessages.LOGIN_INCORRECT);
        err.name = 'LoginError';
        throw (new UniError(err));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const err = new Error(errorMessages.LOGIN_INCORRECT);
            err.name = 'LoginError';
            throw (new UniError(err));
          }
          const token = jwt.sign({ _id: user._id }, secredKey, { expiresIn: jwtExpiresIn });
          res.send({ token });
        });
    })
    .catch((err) => {
      next(err);
    });
};

// Обновить пользователя
const updateUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const err = new Error(errorMessages.USER_NOT_FOUND);
        err.name = 'NotFoundError';
        throw (new UniError(err));
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser, getUserInfo, login, updateUserInfo,
};

const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateUserInfoRoute } = require('../utils/routeValidators');

// роуты user
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateUserInfoRoute, updateUserInfo);

module.exports = userRouter;

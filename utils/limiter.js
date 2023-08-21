const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 минут на период
  max: 100, // 100 запросов разрешается за период
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };

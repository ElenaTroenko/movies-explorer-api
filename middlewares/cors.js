const { corsOptions } = require('../utils/constants');

module.exports = (req, res, next) => {
  // массив со списком разрешенных доменов
  const allowedCors = corsOptions.ALLOWED_CORS;

  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', corsOptions.ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    res.status(corsOptions.OPTIONS_OK_STATUS).end();
  } else {
    next();
  }
};

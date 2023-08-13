const errorMessages = {
  ACCESS_DENIED: 'Доступ запрещен',
  DEFAULT: 'На сервере произошла ошибка',
  DELETE_NOT_SUCCESS: 'Не получилось удалить',
  LOGIN_INCORRECT: 'Пользователь с таким email и паролем не найден',
  MOVIE_NOT_FOUND: 'Запрашиваемый фильм не найден',
  NOT_AUTHORIZED: 'Нет авторизационных данных, либо авторизация не Bearer-типа',
  USER_NOT_FOUND: 'Запрашиваемый пользователь не найден',
  NOT_FOUND: 'Запрашиваемый ресурс не найден',
};

const successMessages = {
  DELETED: 'Фильм удален',
  LISTENING_PORT: 'Прослушиваемый порт:',
};

module.exports = { errorMessages, successMessages };

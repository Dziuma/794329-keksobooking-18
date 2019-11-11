'use strict';

(function () {
  var TIMEOUT = 2000;

  var createXHR = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    if (method === 'GET') {
      xhr.open('GET', url);
    } else if (method === 'POST') {
      xhr.open('POST', url);
    }

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (url, onSuccess, onError) {
    createXHR('GET', url, onSuccess, onError);
  };

  var upload = function (url, onSuccess, onError, data) {
    createXHR('POST', url, onSuccess, onError, data);
  };

  window.load = {
    load: load,
    upload: upload
  };
})();

'use strict';

(function () {
  var main = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var createErrorMessage = function (error) {
    var message = errorMessageTemplate.cloneNode(true);
    var messageText = message.querySelector('.error__message');
    messageText.textContent = error;

    return message;
  };

  var renderErrorMessage = function (message) {
    var errorMessage = createErrorMessage(message);
    main.appendChild(errorMessage);

    var error = document.querySelector('.error');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.Keycode.ESC) {
        error.remove();
      }
    });

    document.addEventListener('click', function () {
      error.remove();
    });
  };

  var renderSuccessMessage = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);

    var success = document.querySelector('.success');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.Keycode.ESC) {
        success.remove();
      }
    });

    document.addEventListener('click', function () {
      success.remove();
    });
  };

  window.message = {
    renderSuccess: renderSuccessMessage,
    renderError: renderErrorMessage
  };
})();

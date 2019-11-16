'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 17;
  var PINS_TO_SHOW = 5;
  var MainPinStartCoords = {
    left: 570,
    top: 375
  };
  var APARTMENT_PRICE_START_PLACEHOLDER = document.querySelector('#price').placeholder;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var filters = filtersForm.querySelectorAll('.map__filter');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formElements = Array.prototype.concat.apply([], [filters, formFieldsets]);
  var addressField = form.querySelector('#address');
  var mainPinHalfWidth = mainPin.offsetWidth / 2;
  var mainPinHalfHeight = mainPin.offsetHeight / 2;
  var mainPinFullHeight = mainPin.offsetHeight + PIN_POINTER_HEIGHT;
  var pinsArray = [];

  var setAddressField = function () {
    var mainPinCenterCoords = {
      x: Math.round(mainPin.offsetLeft + mainPinHalfWidth),
      y: Math.round(mainPin.offsetTop + mainPinHalfHeight)
    };
    var mainPinPointerCoords = {
      x: Math.round(mainPin.offsetLeft + mainPinHalfWidth),
      y: Math.round(mainPin.offsetTop + mainPinFullHeight)
    };

    var isActive = !map.classList.contains('map--faded');

    if (isActive) {
      addressField.value = mainPinPointerCoords.x + ', ' + mainPinPointerCoords.y;
    } else {
      addressField.value = mainPinCenterCoords.x + ', ' + mainPinCenterCoords.y;
    }
  };

  var disableFormElements = function () {
    formElements.forEach(function (element) {
      element.forEach(function (subElement) {
        subElement.setAttribute('disabled', 'true');
      });
    });
  };

  var enableFormElements = function () {
    form.classList.remove('ad-form--disabled');
    formElements.forEach(function (element) {
      element.forEach(function (subElement) {
        subElement.removeAttribute('disabled');
      });
    });
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    enableFormElements();
  };

  var disableMap = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    disableFormElements();
    setAddressField();
    mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.addEventListener('keydown', mainPinEnterPressHandler);
  };

  disableFormElements();

  setAddressField();

  var activatePage = function () {
    window.backend.load('https://js.dump.academy/keksobooking/data', onSuccessLoad, onError);
    enableMap();
    setAddressField();
  };

  var deacivatePage = function () {
    window.pin.removePins();
    window.card.deleteCard();
    moveMainPinToStartPosition();
    setAddressField();
    resetPriceField();
    disableMap();
    filtersForm.reset();
  };

  var mainPinMouseDownHandler = function () {
    activatePage();
    mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', mainPinEnterPressHandler);
  };

  var mainPinEnterPressHandler = function (evt) {
    if (evt.keyCode === window.utils.Keycode.ENTER) {
      activatePage();
      mainPin.removeEventListener('keydown', mainPinEnterPressHandler);
      mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    }
  };

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  mainPin.addEventListener('keydown', mainPinEnterPressHandler);

  var onError = function (message) {
    window.message.renderErrorMessage(message);
  };

  var onSuccessLoad = function (pinsData) {
    window.main.loadedPinsData = pinsData;
    pinsData.forEach(function (pinData) {
      var pin = window.pin.createPin(pinData);
      if (pinsArray.length < PINS_TO_SHOW) {
        pinsArray.push(pin);
      }
    });
    window.pin.renderPins(pinsArray);
  };

  var onSuccessUpload = function () {
    form.reset();
    deacivatePage();
    window.message.renderSuccessMessage();
  };

  var moveMainPinToStartPosition = function () {
    mainPin.style.left = MainPinStartCoords.left + 'px';
    mainPin.style.top = MainPinStartCoords.top + 'px';
  };

  var resetPriceField = function () {
    window.validator.apartmentPrice.placeholder = APARTMENT_PRICE_START_PLACEHOLDER;
    window.validator.apartmentPrice.setAttribute('min', window.config.OFFERS_CONFIG[window.validator.apartmentType.value].minCost);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload('https://js.dump.academy/keksobooking', onSuccessUpload, onError, new FormData(form));
  });

  form.addEventListener('reset', function () {
    deacivatePage();
  });

  window.main = {
    PINS_TO_SHOW: PINS_TO_SHOW,
    map: map,
    mainPin: mainPin,
    mainPinFullHeight: mainPinFullHeight,
    setAddressField: setAddressField
  };
})();

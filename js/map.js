'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_POINTER_HEIGHT = 22;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var filters = filtersForm.querySelectorAll('.map__filter');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formElements = Array.prototype.concat.apply([], [filters, formFieldsets]);
  var address = form.querySelector('#address');
  var roomField = filtersForm.querySelector('#housing-rooms');
  var guestField = filtersForm.querySelector('#housing-guests');
  var fragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var setAddressField = function () {
    var mapPinMainHalfWidth = mapPinMain.offsetWidth / 2;
    var mapPinMainHalfHeight = mapPinMain.offsetHeight / 2;
    var mapPinMainCenterCoords = {
      x: Math.round(mapPinMain.offsetLeft + mapPinMainHalfWidth),
      y: Math.round(mapPinMain.offsetTop + mapPinMainHalfHeight)
    };
    var mapPinMainPointerCoords = {
      x: Math.round(mapPinMain.offsetLeft + mapPinMainHalfWidth),
      y: Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_POINTER_HEIGHT)
    };

    var isActive = !map.classList.contains('map--faded');

    if (isActive) {
      address.value = mapPinMainPointerCoords.x + ', ' + mapPinMainPointerCoords.y;
    } else {
      address.value = mapPinMainCenterCoords.x + ', ' + mapPinMainCenterCoords.y;
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

  var createPin = function (mock) {
    var pin = template.cloneNode(true);
    pin.querySelector('img').src = mock.author.avatar;
    pin.querySelector('img').alt = mock.offer.title;
    pin.style.left = (mock.location.x - PIN_HALF_WIDTH) + 'px';
    pin.style.top = (mock.location.y - PIN_HEIGHT) + 'px';

    return pin;
  };

  var renderPins = function () {
    window.mocks.forEach(function (mock) {
      fragment.appendChild(createPin(mock));
    });
    pins.appendChild(fragment);
  };
  var enableMap = function () {
    renderPins();
    map.classList.remove('map--faded');
    enableFormElements();
  };

  var validateInput = function (evt) {
    var target = evt.target;

    if (roomField.value === '100' && guestField.value !== '0') {
      target.setCustomValidity('Этот дворец не для гостей.');
      filtersForm.reportValidity();
    } else if (roomField.value < guestField.value) {
      target.setCustomValidity('Количество гостей не должно превышать количество комнат.');
      filtersForm.reportValidity();
    } else {
      target.setCustomValidity('');
    }
  };

  disableFormElements();

  setAddressField();

  mapPinMain.addEventListener('mousedown', function () {
    enableMap();
    setAddressField();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      enableMap();
      setAddressField();
    }
  });

  guestField.addEventListener('input', function (evt) {
    validateInput(evt);
  });

  roomField.addEventListener('input', function (evt) {
    validateInput(evt);
  });
})();

'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var PIN_POINTER_HEIGHT = 17;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var PINS_TO_SHOW = 5;
  var MAIN_PIN_START_COORDS = {
    left: 570,
    top: 375
  };
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var filters = filtersForm.querySelectorAll('.map__filter');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formElements = Array.prototype.concat.apply([], [filters, formFieldsets]);
  var addressField = form.querySelector('#address');
  var pinsContainer = document.querySelector('.map__pins');
  var mainPinHalfWidth = mainPin.offsetWidth / 2;
  var mainPinHalfHeight = mainPin.offsetHeight / 2;
  var mainPinFullHeight = mainPin.offsetHeight + PIN_POINTER_HEIGHT;
  var pinsArray = [];
  var pinsFragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

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

  var addPinActiveClass = function (pin) {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i += 1) {
      var pinClass = pins[i].getAttribute('class');
      if (pinClass.includes('map__pin--active')) {
        pins[i].setAttribute('class', 'map__pin');
      }
    }

    pin.setAttribute('class', 'map__pin map__pin--active');
  };

  var deleteCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  var createPin = function (data) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    pin.style.left = (data.location.x - PIN_HALF_WIDTH) + 'px';
    pin.style.top = (data.location.y - PIN_HEIGHT) + 'px';

    pin.addEventListener('click', function () {
      deleteCard();
      renderCard(data);
      addPinActiveClass(pin);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        deleteCard();
        renderCard(data);
        addPinActiveClass(pin);
      }
    });

    return pin;
  };

  var createCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var featuresList = card.querySelector('.popup__features');
    var photo = card.querySelector('.popup__photo');
    var photosContainer = card.querySelector('.popup__photos');
    var photoLinks = data.offer.photos;
    var cardClose = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.OFFERS_CONFIG[data.offer.type].name;
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    card.querySelector('.popup__description').textContent = data.offer.description;
    card.querySelector('.popup__avatar').src = data.author.avatar;

    featuresList.innerHTML = '';

    data.offer.features.forEach(function (feature) {
      var featuresItem = document.createElement('LI');
      featuresItem.classList.add('popup__feature');
      featuresItem.classList.add('popup__feature--' + feature);
      featuresList.appendChild(featuresItem);
    });

    photosContainer.removeChild(photo);

    for (var i = 0; i < photoLinks.length; i += 1) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = photoLinks[i];
      photosContainer.appendChild(newPhoto);
    }

    cardClose.addEventListener('click', function () {
      card.remove();
    });

    document.addEventListener('keydown', function (keyEvt) {
      if (keyEvt.keyCode === ESC_KEYCODE) {
        card.remove();
      }
    });

    return card;
  };

  var renderCard = function (data) {
    var cardFragment = document.createDocumentFragment();
    var filtersContainer = map.querySelector('.map__filters-container');
    var card = createCard(data);

    cardFragment.appendChild(card);
    map.insertBefore(cardFragment, filtersContainer);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    enableFormElements();
  };

  disableFormElements();

  setAddressField();

  var renderPins = function () {
    for (var i = 0; i < PINS_TO_SHOW; i += 1) {
      pinsFragment.appendChild(pinsArray[i]);
    }

    pinsContainer.appendChild(pinsFragment);
  };

  var activatePage = function () {
    enableMap();
    setAddressField();
    renderPins();
  };

  var mainPinMouseDownHandler = function () {
    activatePage();
    mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
  };

  var mainPinEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePage();
      mainPin.removeEventListener('keydown', mainPinEnterPressHandler);
    }
  };

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  mainPin.addEventListener('keydown', mainPinEnterPressHandler);

  var createErrorMessage = function (error) {
    var message = errorMessageTemplate.cloneNode(true);
    var messageText = message.querySelector('.error__message');
    messageText.textContent = error;

    return message;
  };

  var renderErrorMessage = function (error) {
    var main = document.querySelector('main');
    var errorMessage = createErrorMessage(error);

    main.appendChild(errorMessage);
  };

  var onError = function (message) {
    renderErrorMessage(message);
  };

  var onSuccess = function (pinsData) {
    pinsData.forEach(function (pinData) {
      var pin = createPin(pinData);
      pinsArray.push(pin);
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var moveMainPinToStartPosition = function () {
    mainPin.style.left = MAIN_PIN_START_COORDS.left + 'px';
    mainPin.style.top = MAIN_PIN_START_COORDS.top + 'px';
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      form.reset();
      removePins();
      moveMainPinToStartPosition();
      setAddressField();
    }, onError, 'https://js.dump.academy/keksobooking');
    evt.preventDefault();
  });

  window.map = map;
  window.mainPin = mainPin;
  window.mainPinFullHeight = mainPinFullHeight;
  window.setAddressField = setAddressField;
})();

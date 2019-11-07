'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_POINTER_HEIGHT = 17;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var filters = filtersForm.querySelectorAll('.map__filter');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formElements = Array.prototype.concat.apply([], [filters, formFieldsets]);
  var addressField = form.querySelector('#address');
  var pins = document.querySelector('.map__pins');
  var mainPinHalfWidth = mainPin.offsetWidth / 2;
  var mainPinHalfHeight = mainPin.offsetHeight / 2;
  var mainPinFullHeight = mainPin.offsetHeight + PIN_POINTER_HEIGHT;
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

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

  var createPin = function (mock) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = mock.author.avatar;
    pin.querySelector('img').alt = mock.offer.title;
    pin.style.left = (mock.location.x - PIN_HALF_WIDTH) + 'px';
    pin.style.top = (mock.location.y - PIN_HEIGHT) + 'px';

    pin.addEventListener('click', function () {
      renderCard(mock);
    });

    return pin;
  };

  var renderPins = function () {
    var pinFragment = document.createDocumentFragment();

    window.mocks.forEach(function (mock) {
      var pin = createPin(mock);
      pinFragment.appendChild(pin);
    });
    pins.appendChild(pinFragment);
  };

  var createCard = function (mock) {
    var card = cardTemplate.cloneNode(true);
    var featuresList = card.querySelector('.popup__features');
    var photo = card.querySelector('.popup__photo');
    var photosContainer = card.querySelector('.popup__photos');
    var photoLinks = mock.offer.photos;
    var cardClose = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = mock.offer.title;
    card.querySelector('.popup__text--address').textContent = mock.offer.address;
    card.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.OFFERS_CONFIG[mock.offer.type].name;
    card.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
    card.querySelector('.popup__description').textContent = mock.offer.description;
    card.querySelector('.popup__avatar').src = mock.author.avatar;

    featuresList.innerHTML = '';

    mock.offer.features.forEach(function (feature) {
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
      removeElement(card);
    });

    document.addEventListener('keydown', function (keyEvt) {
      if (keyEvt.keyCode === 27) {
        removeElement(card);
      }
    });

    return card;
  };

  var renderCard = function (mock) {
    var cardFragment = document.createDocumentFragment();
    var filtersContainer = map.querySelector('.map__filters-container');
    var card = createCard(mock);

    cardFragment.appendChild(card);
    map.insertBefore(cardFragment, filtersContainer);
  };

  var enableMap = function () {
    renderPins();
    map.classList.remove('map--faded');
    enableFormElements();
  };

  disableFormElements();

  setAddressField();

  var removeElement = function (element) {
    element.remove();
  };

  var activatePage = function () {
    enableMap();
    setAddressField();
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

  window.map = map;
  window.mainPin = mainPin;
  window.mainPinFullHeight = mainPinFullHeight;
  window.setAddressField = setAddressField;
})();

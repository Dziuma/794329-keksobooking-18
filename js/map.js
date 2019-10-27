'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_POINTER_HEIGHT = 22;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var OFFERS_TRANSLATION = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var filters = filtersForm.querySelectorAll('.map__filter');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formElements = Array.prototype.concat.apply([], [filters, formFieldsets]);
  var addressField = form.querySelector('#address');
  var roomField = filtersForm.querySelector('#housing-rooms');
  var guestField = filtersForm.querySelector('#housing-guests');
  var fragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');

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
      addressField.value = mapPinMainPointerCoords.x + ', ' + mapPinMainPointerCoords.y;
    } else {
      addressField.value = mapPinMainCenterCoords.x + ', ' + mapPinMainCenterCoords.y;
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

  var hideElements = function (elements) {
    elements.forEach(function (element) {
      element.style.display = 'none';
    });
  };

  var createPin = function (mock) {
    var pin = templatePin.cloneNode(true);
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

  var createCard = function (mock) {
    var card = templateCard.cloneNode(true);
    var features = card.querySelectorAll('.popup__feature');
    var photo = card.querySelector('.popup__photo');
    var photoLinks = mock.offer.photos;

    card.querySelector('.popup__title').textContent = mock.offer.title;
    card.querySelector('.popup__text--address').textContent = mock.offer.address;
    card.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = OFFERS_TRANSLATION[mock.offer.type];
    card.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
    card.querySelector('.popup__description').textContent = mock.offer.description;
    card.querySelector('.popup__avatar').src = mock.author.avatar;

    hideElements(features);

    mock.offer.features.forEach(function (element) {
      card.querySelector('.popup__feature--' + element).style.display = 'inline-block';
    });

    for (var i = 0; i < photoLinks.length; i += 1) {
      photo.src = photoLinks[i];

      if (i === photoLinks.length - 1) {
        break;
      }

      photo.parentElement.appendChild(photo.cloneNode(true));
    }

    return card;
  };

  var renderCard = function () {
    var mapFiltersContainer = map.querySelector('.map__filters-container');
    var card = createCard(window.mocks[0]);
    fragment.appendChild(card);
    map.insertBefore(fragment, mapFiltersContainer);
  };

  var enableMap = function () {
    renderPins();
    map.classList.remove('map--faded');
    enableFormElements();
    renderCard();
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

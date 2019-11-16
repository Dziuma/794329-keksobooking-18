'use strict';

(function () {
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var map = window.main.map;
  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();

  var addPinActiveClass = function (pin) {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (element) {
      var pinClass = element.getAttribute('class');
      if (pinClass.includes('map__pin--active')) {
        element.setAttribute('class', 'map__pin');
      }
    });

    pin.setAttribute('class', 'map__pin map__pin--active');
  };

  var createPin = function (data) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    pin.style.left = (data.location.x - PIN_HALF_WIDTH) + 'px';
    pin.style.top = (data.location.y - PIN_HEIGHT) + 'px';

    pin.addEventListener('click', function () {
      window.card.deleteCard();
      window.card.renderCard(data);
      addPinActiveClass(pin);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.Keycode.ENTER) {
        window.card.deleteCard();
        window.card.renderCard(data);
        addPinActiveClass(pin);
      }
    });

    return pin;
  };

  var renderPins = function (array) {
    array.forEach(function (item) {
      pinsFragment.appendChild(item);
    });

    pinsContainer.appendChild(pinsFragment);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    createPin: createPin,
    renderPins: renderPins,
    removePins: removePins
  };
})();

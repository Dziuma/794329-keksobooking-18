'use strict';

(function () {
  var PINS_TO_SHOW = window.main.PINS_TO_SHOW;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filters = document.querySelectorAll('.map__filter, .map__checkbox');

  var matchesType = function (pinData, type) {
    return type === 'any' || pinData.offer.type === type;
  };

  var matchesPrice = function (pinData, price) {
    return price === 'any' ||
    (price === 'low' && pinData.offer.price < LOW_PRICE) ||
    (price === 'middle' && pinData.offer.price >= LOW_PRICE && pinData.offer.price < HIGH_PRICE) ||
    (price === 'high' && pinData.offer.price >= HIGH_PRICE);
  };

  var matchesRooms = function (pinData, rooms) {
    return rooms === 'any' || pinData.offer.rooms === Number(rooms);
  };

  var matchesGuests = function (pinData, guests) {
    return guests === 'any' || pinData.offer.guests === Number(guests);
  };

  var matchesFeatures = function (pinData, features) {
    return features.every(function (element) {
      return pinData.offer.features.includes(element.value);
    });
  };

  var filterPins = function (pinsData, config) {
    var filteredData = [];

    for (var i = 0; i < pinsData.length; i += 1) {
      var pinData = pinsData[i];

      if (matchesType(pinData, config.type) &&
      matchesPrice(pinData, config.price) &&
      matchesRooms(pinData, config.rooms) &&
      matchesGuests(pinData, config.guests) &&
      matchesFeatures(pinData, config.features)) {
        filteredData.push(pinData);
        if (filteredData.length === PINS_TO_SHOW) {
          return filteredData;
        }
      }
    }

    return filteredData;
  };

  var filterChangeHandler = window.utils.debounce(function () {
    var config = {
      type: filterType.value,
      price: filterPrice.value,
      rooms: filterRooms.value,
      guests: filterGuests.value,
      features: Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
    };
    var pinsData = filterPins(window.main.loadedPinsData, config);
    var pins = [];

    pinsData.forEach(function (pinData) {
      var pin = window.pin.createPin(pinData);

      pins.push(pin);
    });

    window.pin.removePins();
    window.pin.renderPins(pins);
    window.advert.deleteCard();
  });

  filters.forEach(function (filter) {
    filter.addEventListener('change', filterChangeHandler);
  });
})();

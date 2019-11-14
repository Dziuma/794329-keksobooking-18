'use strict';

(function () {
  var PINS_TO_SHOW = window.map.PINS_TO_SHOW;
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

  var matchesFeatures = function (pinData) {
    var features = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    return features.every(function (element) {
      return pinData.offer.features.includes(element.value);
    });
  };

  var filter = function (pinsData, config) {
    var filteredData = [];

    for (var i = 0; i < pinsData.length; i += 1) {
      if (matchesType(pinsData[i], config.type) &&
      matchesPrice(pinsData[i], config.price) &&
      matchesRooms(pinsData[i], config.rooms) &&
      matchesGuests(pinsData[i], config.guests) &&
      matchesFeatures(pinsData[i])) {
        filteredData.push(pinsData[i]);
        if (filteredData.length === PINS_TO_SHOW) {
          return filteredData;
        }
      }
    }

    return filteredData;
  };

  var filterChangeHandler = function () {
    var config = {
      type: filterType.value,
      price: filterPrice.value,
      rooms: filterRooms.value,
      guests: filterGuests.value
    };
    var pinsData = filter(window.map.loadedPinsData, config);
    var pins = [];

    pinsData.forEach(function (pinData) {
      var pin = window.map.createPin(pinData);

      pins.push(pin);
    });

    window.map.removePins();
    window.map.renderPins(pins);
  };

  filters.forEach(function (item) {
    item.addEventListener('change', filterChangeHandler);
  });
})();

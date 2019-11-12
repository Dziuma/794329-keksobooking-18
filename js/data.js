'use strict';

(function () {
  var OFFERS_CONFIG = {
    bungalo: {
      roomsCount: 1,
      guestsCount: 1,
      name: 'Бунгало',
      minCost: 0
    },
    house: {
      roomsCount: 2,
      guestsCount: 2,
      name: 'Дом',
      minCost: 5000
    },
    flat: {
      roomsCount: 3,
      guestsCount: 3,
      name: 'Квартира',
      minCost: 1000
    },
    palace: {
      roomsCount: 100,
      guestsCount: 0,
      name: 'Дворец',
      minCost: 10000
    }
  };

  window.data = {
    OFFERS_CONFIG: OFFERS_CONFIG,
  };
})();

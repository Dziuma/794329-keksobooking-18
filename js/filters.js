'use strict';

(function () {
  var PINS_TO_SHOW = window.map.PINS_TO_SHOW;
  var ANY_APARTMENT_TYPE = 'any';
  var filterApartmentType = document.querySelector('#housing-type');

  filterApartmentType.addEventListener('change', function () {
    var apartmentTypeArray = [];
    var pin = null;

    window.map.loadedPinsData.forEach(function (pinData) {
      if (filterApartmentType.value === pinData.offer.type) {
        if (apartmentTypeArray.length < PINS_TO_SHOW) {
          pin = window.map.createPin(pinData);
          apartmentTypeArray.push(pin);
        }
      } else if (filterApartmentType.value === ANY_APARTMENT_TYPE) {
        if (apartmentTypeArray.length < PINS_TO_SHOW) {
          pin = window.map.createPin(pinData);
          apartmentTypeArray.push(pin);
        }
      }
    });

    window.map.removePins();
    window.map.renderPins(apartmentTypeArray);
  });
})();

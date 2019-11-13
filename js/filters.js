'use strict';

(function () {
  var PINS_TO_SHOW = window.map.PINS_TO_SHOW;
  var filterType = document.querySelector('#housing-type');

  var matchesType = function (pinData, type) {
    return type === 'any' || pinData.offer.type === type;
  };

  var filter = function (pinsData, config) {
    var filteredData = [];

    for (var i = 0; i < pinsData.length; i += 1) {
      if (matchesType(pinsData[i], config)) {
        filteredData.push(pinsData[i]);
      }
      if (filteredData.length === PINS_TO_SHOW) {
        return filteredData;
      }
    }

    return filteredData;
  };

  filterType.addEventListener('change', function () {
    var pinsData = filter(window.map.loadedPinsData, filterType.value);
    var pins = [];

    pinsData.forEach(function (pinData) {
      var pin = window.map.createPin(pinData);

      pins.push(pin);
    });

    window.map.removePins();
    window.map.renderPins(pins);
  });
})();

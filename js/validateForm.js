'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var validateInput = function (evt) {
    var target = evt.target;

    if (roomNumber.value === '100' && capacity.value !== '0') {
      target.setCustomValidity('Этот дворец не для гостей.');
    } else if (roomNumber.value < capacity.value) {
      target.setCustomValidity('Количество гостей не должно превышать количество комнат.');
    } else {
      target.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('input', function (evt) {
    validateInput(evt);
  });

  capacity.addEventListener('input', function (evt) {
    validateInput(evt);
  });

  form.addEventListener('submit', function (evt) {
    if (roomNumber.value === '100' && capacity.value !== '0') {
      evt.preventDefault();
      capacity.setCustomValidity('Этот дворец не для гостей.');
    } else if (roomNumber.value < capacity.value) {
      evt.preventDefault();
      capacity.setCustomValidity('Количество гостей не должно превышать количество комнат.');
    } else {
      capacity.setCustomValidity('');
    }
  });

  var typeField = form.querySelector('#type');
  var priceField = form.querySelector('#price');

  var setMinPrice = function () {
    priceField.setAttribute('min', window.OFFERS_CONFIG[typeField.value].minCost);
  };

  setMinPrice();

  typeField.addEventListener('input', function () {
    setMinPrice();
  });
})();

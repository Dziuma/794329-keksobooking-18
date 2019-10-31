'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var apartmentType = form.querySelector('#type');
  var apartmentPrice = form.querySelector('#price');
  var checkin = form.querySelector('#timein');
  var checkout = form.querySelector('#timeout');

  var validateRoomsAndGuestsInput = function (evt, rooms, guests) {
    var target = evt.target;

    if (rooms === '100' && guests !== '0') {
      target.setCustomValidity('Этот дворец не для гостей.');
    } else if (rooms < guests) {
      target.setCustomValidity('Количество гостей не должно превышать количество комнат.');
    } else {
      target.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('input', function (evt) {
    validateRoomsAndGuestsInput(evt, roomNumber.value, capacity.value);
  });

  capacity.addEventListener('input', function (evt) {
    validateRoomsAndGuestsInput(evt, roomNumber.value, capacity.value);
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

  var setMinPrice = function () {
    apartmentPrice.setAttribute('min', window.OFFERS_CONFIG[apartmentType.value].minCost);
  };

  setMinPrice();

  apartmentType.addEventListener('input', function () {
    setMinPrice();
  });

  checkin.addEventListener('input', function (evt) {
    var target = evt.target;

    checkout.selectedIndex = target.selectedIndex;
  });

  checkout.addEventListener('input', function (evt) {
    var target = evt.target;

    checkin.selectedIndex = target.selectedIndex;
  });
})();

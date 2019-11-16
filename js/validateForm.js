'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var apartmentType = form.querySelector('#type');
  var apartmentPrice = form.querySelector('#price');
  var checkin = form.querySelector('#timein');
  var checkout = form.querySelector('#timeout');

  var validateGuestsInput = function (rooms, guests) {
    var message = '';

    if (rooms === '100' && guests !== '0') {
      message = 'Этот дворец не для гостей.';
    } else if (rooms !== '100' && guests === '0') {
      message = 'Укажите количество гостей.';
    } else if (rooms < guests) {
      message = 'Количество гостей не должно превышать количество комнат.';
    }

    return message;
  };

  var validateRoomsInput = function (rooms, guests) {
    var message = '';

    if (rooms === '100' && guests !== '0') {
      message = 'Этот дворец не для гостей.';
    } else if (rooms !== '100' && guests === '0') {
      message = 'Не для гостей только дворец.';
    }

    return message;
  };

  roomNumber.addEventListener('input', function (evt) {
    var message = validateRoomsInput(roomNumber.value, capacity.value);

    evt.target.setCustomValidity(message);
    roomNumber.reportValidity();
  });

  capacity.addEventListener('input', function (evt) {
    var message = validateGuestsInput(roomNumber.value, capacity.value);

    evt.target.setCustomValidity(message);
    capacity.reportValidity();
  });

  var setMinPrice = function () {
    apartmentPrice.setAttribute('min', window.data.OFFERS_CONFIG[apartmentType.value].minCost);
    apartmentPrice.setAttribute('placeholder', window.data.OFFERS_CONFIG[apartmentType.value].minCost);
  };

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

  window.validateForm = {
    apartmentPrice: apartmentPrice,
    apartmentType: apartmentType
  };
})();

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
    } else if (rooms > guests) {
      message = 'Количество комнат не должно превышать количества гостей.';
    }

    return message;
  };

  roomNumber.addEventListener('input', function (evt) {
    // validateRoomsInput(roomNumber.value, capacity.value);
    evt.target.setCustomValidity(validateRoomsInput(roomNumber.value, capacity.value));
    roomNumber.reportValidity();
  });

  capacity.addEventListener('input', function (evt) {
    // validateGuestsInput(roomNumber.value, capacity.value);
    evt.target.setCustomValidity(validateGuestsInput(roomNumber.value, capacity.value));
    capacity.reportValidity();
  });

  var setMinPrice = function (element, type) {
    element.setAttribute('min', window.OFFERS_CONFIG[type.value].minCost);
  };

  setMinPrice(apartmentPrice, apartmentType);

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

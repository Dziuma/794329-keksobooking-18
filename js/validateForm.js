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
      form.reportValidity();
    } else if (rooms !== '100' && guests === '0') {
      target.setCustomValidity('Укажите количество гостей.');
      form.reportValidity();
    } else if (rooms < guests) {
      target.setCustomValidity('Количество гостей не должно превышать количество комнат.');
      form.reportValidity();
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

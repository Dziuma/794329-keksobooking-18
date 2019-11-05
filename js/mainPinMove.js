'use strict';

(function () {
  var mainPin = window.mainPin;
  var map = document.querySelector('.map__pins');
  var shift = {
    x: null,
    y: null
  };

  var moveTo = function (moveEvt, draggable, draggableParent) {
    var draggableCoords = {
      x: moveEvt.clientX - shift.x,
      y: moveEvt.clientY - shift.y
    };

    if (draggableCoords.x < -draggable.offsetWidth / 2) {
      draggableCoords.x = -draggable.offsetWidth / 2;
    } else if (draggableCoords.y < 0) {
      draggableCoords.y = 0;
    } else if (draggableCoords.x > draggableParent.offsetWidth - draggable.offsetWidth / 2) {
      draggableCoords.x = draggableParent.offsetWidth - draggable.offsetWidth / 2;
    } else if (draggableCoords.y > draggableParent.offsetHeight - window.mainPinFullHeight) {
      draggableCoords.y = draggableParent.offsetHeight - window.mainPinFullHeight;
    }

    draggable.style.left = draggableCoords.x + 'px';
    draggable.style.top = draggableCoords.y + 'px';

    window.setAddressField();
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    shift = {
      x: downEvt.clientX - mainPin.offsetLeft,
      y: downEvt.clientY - mainPin.offsetTop
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    moveTo(moveEvt, mainPin, map);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMouseDown);
})();

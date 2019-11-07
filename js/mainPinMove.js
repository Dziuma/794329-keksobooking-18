'use strict';

(function () {
  var mainPin = window.mainPin;
  var map = window.map;
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
      if (draggableCoords.y < 0) {
        draggableCoords.y = 0;
      } else if (draggableCoords.y > draggableParent.offsetHeight - window.mainPinFullHeight) {
        draggableCoords.y = draggableParent.offsetHeight - window.mainPinFullHeight;
      }
    } else if (draggableCoords.y < 0) {
      draggableCoords.y = 0;
      if (draggableCoords.x > draggableParent.offsetWidth - draggable.offsetWidth / 2) {
        draggableCoords.x = draggableParent.offsetWidth - draggable.offsetWidth / 2;
      }
    } else if (draggableCoords.x > draggableParent.offsetWidth - draggable.offsetWidth / 2) {
      draggableCoords.x = draggableParent.offsetWidth - draggable.offsetWidth / 2;
      if (draggableCoords.y > draggableParent.offsetHeight - window.mainPinFullHeight) {
        draggableCoords.y = draggableParent.offsetHeight - window.mainPinFullHeight;
      }
    } else if (draggableCoords.y > draggableParent.offsetHeight - window.mainPinFullHeight) {
      draggableCoords.y = draggableParent.offsetHeight - window.mainPinFullHeight;
    }

    draggable.style.left = draggableCoords.x + 'px';
    draggable.style.top = draggableCoords.y + 'px';

    window.setAddressField();
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    shift = {
      x: evt.clientX - mainPin.offsetLeft,
      y: evt.clientY - mainPin.offsetTop
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (evt) {
    moveTo(evt, mainPin, map);
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMouseDown);
})();

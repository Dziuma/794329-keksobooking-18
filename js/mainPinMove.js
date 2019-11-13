'use strict';

(function () {
  var MIN_COORD_Y = 130;
  var MAX_COORD_Y = 630;
  var mainPin = window.map.mainPin;
  var map = window.map.map;
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
      if (draggableCoords.y < MIN_COORD_Y - window.map.mainPinFullHeight) {
        draggableCoords.y = MIN_COORD_Y - window.map.mainPinFullHeight;
      } else if (draggableCoords.y > MAX_COORD_Y - window.map.mainPinFullHeight) {
        draggableCoords.y = MAX_COORD_Y - window.map.mainPinFullHeight;
      }
    } else if (draggableCoords.y < MIN_COORD_Y - window.map.mainPinFullHeight) {
      draggableCoords.y = MIN_COORD_Y - window.map.mainPinFullHeight;
      if (draggableCoords.x > draggableParent.offsetWidth - draggable.offsetWidth / 2) {
        draggableCoords.x = draggableParent.offsetWidth - draggable.offsetWidth / 2;
      }
    } else if (draggableCoords.x > draggableParent.offsetWidth - draggable.offsetWidth / 2) {
      draggableCoords.x = draggableParent.offsetWidth - draggable.offsetWidth / 2;
      if (draggableCoords.y > MAX_COORD_Y - window.map.mainPinFullHeight) {
        draggableCoords.y = MAX_COORD_Y - window.map.mainPinFullHeight;
      }
    } else if (draggableCoords.y > MAX_COORD_Y - window.map.mainPinFullHeight) {
      draggableCoords.y = MAX_COORD_Y - window.map.mainPinFullHeight;
    }

    draggable.style.left = draggableCoords.x + 'px';
    draggable.style.top = draggableCoords.y + 'px';

    window.map.setAddressField();
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

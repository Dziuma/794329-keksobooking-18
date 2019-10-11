'use strict';

var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];
var OFFER_TITLES = [
  'Уютный домик',
  'Уютное гнездышко для молодоженов',
  'Дворец со всеми удобствами',
  'Бунгало для странника',
  'Дом для всей семьи',
  'Великолепная квартира в центре',
  'Сдается квартира',
  'Сдается бунгало'
];
var OFFER_PRICES = [550, 1500, 20000, 1000, 3000, 600, 1200, 3500];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = [
  'Уютная, современная квартира расположена в центре. Удобное месторасположение позволяет добраться в любой конец города городским транспортом. станция метро Токио-Центр. На кухне есть все необходимое холодильник, микроволновая печь, стиральная машина. В вашем распоряжении также будут утюг и гладильная доска. Рядом продуктовый магазин. Детская больница.',
  'Сдам 1-комнатную квартиру с хорошим ремонтом недалеко от метро Фуджыкура. Есть вся необходимая мебель, шкаф-купэ,холодильник, СМА, СВЧ, телевизор. Чистый, ухоженный подъезд.',
  'Сдается впервые трёхкомнатная квартира в новострое. Квартира полностью новая , выполнен качественный современный и дорогой евроремонт ремонт. В квартире есть все самое необходимое, дорогая мебель и техника, метро научная в 5 минутах ходьбы.',
  'Сдается бунгало для странника. Аскетичная обстановка, ничего лишнего, только уединение и покой.',
  'Сдаётся в аренду для отдыха, в отличном районе Токио, супер-люксик для влюблёных пар, так же данная квартирка идеальна для проведения медового месяца молодожёнам!!!;) Люкс укомплектован всем тем, без чего не будет комфортным отдых: КОНДИЦИОНЕР, телевизор, вместительный холодильник, большая двуспальная удобная кровать, новая модная мебель, евроремонт.',
  'Сдается уютный дом на окраине Токио. В доме есть вся необходимая мебель для роживания. Индивидуальное отопление , гарячая-холодная вода, ванная, удобства в доме, косметический ремонт. Бытовая техника: холодильник, газ.плита ,стиральная машинка, ТВ. Земельный участок 10 соток. Отдельный двор.',
  'Сдам дворец в элитном раёне Токио, площадью 2300 кв.м., площадь участка 3га, spa-домик 130 м2, , гараж на 25 машин. Вся инфраструктура: парковая зона, освещение, охрана, детский парк отдыха , ресторан, бассейн.',
  'Цена указана при бронировании от 5 суток. Сдам посуточно и почасово бунгало. Расположено в трехэтажном кирпичном доме гостиничного типа на третьем этаже в пяти минутах ходьбы от ст м Спортивная. Рядом есть платная автостоянка, круглосуточный супермаркет, рынок. Бунгало чистое,ухоженное, оборудована всем необходимым.'
];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var LOCATION_X_START = 150;
var LOCATION_X_END = 850;
var LOCATION_Y_START = 130;
var LOCATION_Y_END = 630;
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var OFFERS_CONFIG = {
  bungalo: {
    roomsCount: 1,
    guestsCount: 1
  },
  house: {
    roomsCount: 2,
    guestsCount: 2
  },
  flat: {
    roomsCount: 3,
    guestsCount: 3
  },
  palace: {
    roomsCount: 100,
    guestsCount: 0
  }
};

var fragment = document.createDocumentFragment();
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var getRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

var getRandomArrayElement = function (array) {
  var randomArrayIndex = getRandomNumber(0, array.length - 1);
  return array[randomArrayIndex];
};

var shuffleArray = function (array) {
  var newArray = array.slice();
  for (var i = newArray.length - 1; i > 0; i -= 1) {
    var randomArrayIndex = getRandomNumber(0, array.length - 1);
    var randomElement = newArray[randomArrayIndex];
    newArray[randomArrayIndex] = newArray[i];
    newArray[i] = randomElement;
  }
  return newArray;
};

var generateRandomLengthArray = function (array) {
  var shuffledArray = shuffleArray(array);
  var randomLength = getRandomNumber(1, array.length);
  return shuffledArray.slice(0, randomLength);
};

var getLocationXCoords = function () {
  return getRandomNumber(LOCATION_X_START, LOCATION_X_END);
};

var getLocationYCoords = function () {
  return getRandomNumber(LOCATION_Y_START, LOCATION_Y_END);
};

var generateMocks = function () {
  var mocks = [];

  for (var i = 0; i < AVATARS.length; i += 1) {
    var pinXCoord = getLocationXCoords();
    var pinYCoord = getLocationYCoords();
    var offerType = getRandomArrayElement(Object.keys(OFFERS_CONFIG));
    var offerCheckin = getRandomArrayElement(OFFER_CHECKINS);
    var mock = {
      'author': {
        'avatar': AVATARS[i]
      },
      'offer': {
        'title': OFFER_TITLES[i],
        'address': pinXCoord + ', ' + pinYCoord,
        'price': getRandomArrayElement(OFFER_PRICES),
        'type': offerType,
        'rooms': OFFERS_CONFIG[offerType].roomsCount,
        'guests': OFFERS_CONFIG[offerType].guestsCount,
        'checkin': offerCheckin,
        'checkout': offerCheckin,
        'features': generateRandomLengthArray(OFFER_FEATURES),
        'description': OFFER_DESCRIPTIONS[i],
        'photos': generateRandomLengthArray(OFFER_PHOTOS)
      },
      'location': {
        'x': pinXCoord,
        'y': pinYCoord
      }
    };
    mocks.push(mock);
  }

  return mocks;
};

var createPin = function (mock) {
  var pin = template.cloneNode(true);
  pin.querySelector('img').src = mock.author.avatar;
  pin.querySelector('img').alt = mock.offer.title;
  pin.style.left = (mock.location.x - PIN_HALF_WIDTH) + 'px';
  pin.style.top = (mock.location.y - PIN_HEIGHT) + 'px';

  return pin;
};

var renderPins = function () {
  var mocks = generateMocks();
  mocks.forEach(function (mock) {
    fragment.appendChild(createPin(mock));
  });
  pins.appendChild(fragment);
};

generateMocks();

var ENTER_KEYCODE = 13;
var PIN_POINTER_HEIGHT = 22;
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var filtersForm = document.querySelector('.map__filters');
var form = document.querySelector('.ad-form');
var filters = filtersForm.querySelectorAll('.map__filter');
var formFieldsets = document.querySelectorAll('fieldset');
var formElements = Array.prototype.concat.apply([], [filters, formFieldsets]);
var address = form.querySelector('#address');
var roomField = filtersForm.querySelector('#housing-rooms');
var guestField = filtersForm.querySelector('#housing-guests');

var setAddressField = function () {
  var mapPinMainHalfWidth = mapPinMain.offsetWidth / 2;
  var mapPinMainHalfHeight = mapPinMain.offsetHeight / 2;
  var mapPinMainCenterCoords = {
    x: Math.round(mapPinMain.offsetLeft + mapPinMainHalfWidth),
    y: Math.round(mapPinMain.offsetTop + mapPinMainHalfHeight)
  };
  var mapPinMainPointerCoords = {
    x: Math.round(mapPinMain.offsetLeft + mapPinMainHalfWidth),
    y: Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_POINTER_HEIGHT)
  };

  var isActive = !map.classList.contains('map--faded');

  if (isActive) {
    address.value = mapPinMainPointerCoords.x + ', ' + mapPinMainPointerCoords.y;
  } else {
    address.value = mapPinMainCenterCoords.x + ', ' + mapPinMainCenterCoords.y;
  }
};

var disableFormElements = function () {
  formElements.forEach(function (element) {
    element.forEach(function (subElement) {
      subElement.setAttribute('disabled', 'true');
    });
  });
};

var enableFormElements = function () {
  form.classList.remove('ad-form--disabled');
  formElements.forEach(function (element) {
    element.forEach(function (subElement) {
      subElement.removeAttribute('disabled');
    });
  });
};

var enableMap = function () {
  renderPins();
  map.classList.remove('map--faded');
  enableFormElements();
};

var validateInput = function (evt) {
  var target = evt.target;

  if (roomField.value === '100' && guestField.value !== '0') {
    target.setCustomValidity('Этот дворец не для гостей.');
    filtersForm.reportValidity();
  } else if (roomField.value < guestField.value) {
    target.setCustomValidity('Количество гостей не должно превышать количество комнат.');
    filtersForm.reportValidity();
  } else {
    target.setCustomValidity('');
  }
};

disableFormElements();

setAddressField();

mapPinMain.addEventListener('mousedown', function () {
  enableMap();
  setAddressField();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    enableMap();
    setAddressField();
  }
});

guestField.addEventListener('input', function (evt) {
  validateInput(evt);
});

roomField.addEventListener('input', function (evt) {
  validateInput(evt);
});

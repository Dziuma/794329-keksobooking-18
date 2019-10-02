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
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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
var LOCATION_X_COORDS = [150, 250, 350, 450, 550, 650, 750, 850];
var LOCATION_Y_COORDS = [190, 340, 270, 440, 220, 380, 320, 500];
var AMOUNT_OF_MESSAGES = 8;
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var mocks = [];
var fragment = document.createDocumentFragment();
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayElement = function (array) {
  var randomArrayIndex = getRandomArrayIndex(array);
  return array[randomArrayIndex];
};

var getRandomAmountOfArrayElements = function (array) {
  return Math.ceil(Math.random() * array.length);
};

var mixArray = function (array) {
  var newArray = array.slice(0);
  for (var i = 0; i < array.length; i += 1) {
    var randomArrayIndex = getRandomArrayIndex(newArray);
    var mixedElement = newArray.splice(randomArrayIndex, 1);
    randomArrayIndex = getRandomArrayIndex(array);
    newArray.splice(randomArrayIndex, 0, mixedElement);
  }
  return newArray;
};

var generateRandomAmountOfArrayElements = function (array) {
  var mixedArray = mixArray(array);
  var amountOfElements = getRandomAmountOfArrayElements(array);
  return mixedArray.slice(0, amountOfElements);
};

var generateMocks = function () {
  var messages = [];
  for (var i = 0; i < AMOUNT_OF_MESSAGES; i += 1) {
    var messageInfo = {
      'author': {
        'avatar': null
      },
      'offer': {
        'title': null,
        'address': null,
        'price': null,
        'type': null,
        'rooms': null,
        'guests': null,
        'checkin': null,
        'checkout': null,
        'features': null,
        'description': null,
        'photos': null
      },
      'location': {
        'x': null,
        'y': null
      }
    };
    var rooms;
    var guests;
    messageInfo.author.avatar = AVATARS[i];
    messageInfo.offer.title = OFFER_TITLES[i];
    messageInfo.offer.address = LOCATION_X_COORDS[i] + ', ' + LOCATION_Y_COORDS[i];
    messageInfo.offer.price = getRandomArrayElement(OFFER_PRICES);
    messageInfo.offer.type = getRandomArrayElement(OFFER_TYPES);
    switch (messageInfo.offer.type) {
      case 'bungalo':
        rooms = 1;
        break;
      case 'house':
        rooms = 2;
        break;
      case 'flat':
        rooms = 3;
        break;
      case 'palace':
        rooms = 100;
    }
    messageInfo.offer.rooms = rooms;
    switch (messageInfo.offer.type) {
      case 'bungalo':
        guests = 1;
        break;
      case 'house':
        guests = 2;
        break;
      case 'flat':
        guests = 3;
        break;
      case 'palace':
        guests = 0;
    }
    messageInfo.offer.guests = guests;
    messageInfo.offer.checkin = getRandomArrayElement(OFFER_CHECKINS);
    messageInfo.offer.checkout = messageInfo.offer.checkin;
    messageInfo.offer.features = generateRandomAmountOfArrayElements(OFFER_FEATURES);
    messageInfo.offer.description = OFFER_DESCRIPTIONS[i];
    messageInfo.offer.photos = generateRandomAmountOfArrayElements(OFFER_PHOTOS);
    messageInfo.location.x = LOCATION_X_COORDS[i];
    messageInfo.location.y = LOCATION_Y_COORDS[i];
    messages.push(messageInfo);
  }

  mocks = messages;
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
  for (var i = 0; i < mocks.length; i += 1) {
    fragment.appendChild(createPin(mocks[i]));
  }
  pins.appendChild(fragment);
};

generateMocks();

renderPins();

'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var createCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var featuresList = card.querySelector('.popup__features');
    var photo = card.querySelector('.popup__photo');
    var photosContainer = card.querySelector('.popup__photos');
    var photoLinks = data.offer.photos;
    var cardClose = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.config.OFFERS_CONFIG[data.offer.type].name;
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    card.querySelector('.popup__description').textContent = data.offer.description;
    card.querySelector('.popup__avatar').src = data.author.avatar;

    featuresList.innerHTML = '';

    data.offer.features.forEach(function (feature) {
      var featuresItem = document.createElement('LI');
      featuresItem.classList.add('popup__feature');
      featuresItem.classList.add('popup__feature--' + feature);
      featuresList.appendChild(featuresItem);
    });

    photosContainer.removeChild(photo);

    Array.from(photoLinks).forEach(function (link) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = link;
      photosContainer.appendChild(newPhoto);
    });

    cardClose.addEventListener('click', function () {
      card.remove();
    });

    document.addEventListener('keydown', function (keyEvt) {
      if (keyEvt.keyCode === window.utils.Keycode.ESC) {
        card.remove();
      }
    });

    return card;
  };

  var renderCard = function (data) {
    var cardFragment = document.createDocumentFragment();
    var filtersContainer = window.main.map.querySelector('.map__filters-container');
    var card = createCard(data);

    cardFragment.appendChild(card);
    window.main.map.insertBefore(cardFragment, filtersContainer);
  };

  var deleteCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  window.advert = {
    deleteCard: deleteCard,
    renderCard: renderCard
  };
})();

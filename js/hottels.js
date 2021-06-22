import {similarAdvert} from './data.js';

const similarHottelsTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarHottels = similarAdvert();

const similarListFragment = document.createDocumentFragment();

const typeOfHousing = (type) => ({
  if (type == 'flat') {
    'Квартира';
  } else if (type == 'bungalow') {
    'Бунгало';
  } else if (type == 'house') {
    'Дом';
  } else if (type == 'palace') {
    'Дворец';
  } else if (type == 'hotel') {
    'Отель';
  };
});

similarHottels.forEach((offer, typeOfHousing) => {
  const similarHotel = similarHottelsTemplate.cloneNode(true);
  similarHotel.querySelector('.popup__title').textContent = offer.title;
  similarHotel.querySelector('.popup__text--address').textContent = offer.address;
  similarHotel.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  similarHotel.querySelector('..popup__type').textContent = typeOfHousing(offer.type);
  similarHotel.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  similarHotel.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  similarHotel.querySelector('.popup__description').textContent = offer.description;
  similarHotel.querySelector('.popup__photos').src = offer.photos;
  similarHotel.querySelector('.popup__avatar').src = author.avatar;
  similarListFragment.appendChild(similarHotel);
});

const similarListHotels = document.querySelector('#map-canvas');

similarListHotels.appendChild(similarListFragment);

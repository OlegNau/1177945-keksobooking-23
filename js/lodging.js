const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

function getType(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalow') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  } else if (type === 'palace') {
    return 'Дворец';
  } else if (type === 'hotel') {
    return'Отель';
  }
}

const createCard = (offer) => {
  const similarHotel = cardTemplate.cloneNode(true);
  similarHotel.querySelector('.popup__title').textContent = offer.title;
  similarHotel.querySelector('.popup__text--address').textContent = offer.address;
  similarHotel.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  similarHotel.querySelector('.popup__type').textContent = getType(offer.type);
  similarHotel.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  similarHotel.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  similarHotel.querySelector('.popup__description').textContent = offer.description;
  similarHotel.querySelector('.popup__photos').src = offer.photos;
  similarHotel.querySelector('.popup__avatar').src = offer.avatar;
  return similarHotel;
};

export {createCard};

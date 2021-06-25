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

const createCard = (offerLodging) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offerLodging.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerLodging.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offerLodging.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(offerLodging.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offerLodging.offer.rooms} комнаты для ${offerLodging.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerLodging.offer.checkin}, выезд до ${offerLodging.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offerLodging.offer.description;
  cardElement.querySelector('.popup__photos').src = offerLodging.offer.photos;
  cardElement.querySelector('.popup__avatar').src = offerLodging.author.avatar;
  return cardElement;
};

export {createCard};

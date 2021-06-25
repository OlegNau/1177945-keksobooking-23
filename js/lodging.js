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
  const similarHotel = cardTemplate.cloneNode(true);
  similarHotel.querySelector('.popup__title').textContent = offerLodging.offer.title;
  similarHotel.querySelector('.popup__text--address').textContent = offerLodging.offer.address;
  similarHotel.querySelector('.popup__text--price').textContent = `${offerLodging.offer.price} ₽/ночь`;
  similarHotel.querySelector('.popup__type').textContent = getType(offerLodging.offer.type);
  similarHotel.querySelector('.popup__text--capacity').textContent = `${offerLodging.offer.rooms} комнаты для ${offerLodging.offer.guests} гостей`;
  similarHotel.querySelector('.popup__text--time').textContent = `Заезд после ${offerLodging.offer.checkin}, выезд до ${offerLodging.offer.checkout}`;
  similarHotel.querySelector('.popup__description').textContent = offerLodging.offer.description;
  similarHotel.querySelector('.popup__photos').src = offerLodging.offer.photos;
  similarHotel.querySelector('.popup__avatar').src = offerLodging.author.avatar;
  return similarHotel;
};

export {createCard};

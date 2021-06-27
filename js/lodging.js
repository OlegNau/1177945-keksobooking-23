const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const photoElement = cardTemplate.querySelector('.popup__photo');
const featureElement = cardTemplate.querySelector('.popup__feature');


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

const createFeatures = (features) => {
  const fragment = document.createDocumentFragment();
  features.forEach((featuresElement) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__photo');
    feature.classList.add(`popup__feature--${featuresElement}`);
    fragment.appendChild(feature);
  });
  return fragment;
};

const createPhotos = (photoArray) => {
  const fragment = document.createDocumentFragment();
  photoArray.forEach((link) => {
    const photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = link;
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    fragment.appendChild(photo);
  });
  return fragment;
};

const createCard = (ad) => {
  photoElement.remove();
  featureElement.remove();
  const photoElements = createPhotos(ad.offer.photos);
  const featuresElements = createFeatures(ad.offer.features);
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  cardElement.querySelector('.popup__features').appendChild(featuresElements);
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__photos').appendChild(photoElements);
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  return cardElement;
};

export {createCard};

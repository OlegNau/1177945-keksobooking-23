const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const getType = (type) => {
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
};

const createFeatures = (features) => {
  const fragment = document.createDocumentFragment();
  features.forEach((featuresElement) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature');
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
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title || '';
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address || '';
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price ? `${ad.offer.price} ₽/ночь` : '';
  cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type) || '';
  cardElement.querySelector('.popup__text--capacity').textContent = Number.isInteger(ad.offer.rooms) && Number.isInteger(ad.offer.guests) ?
    `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей` : '';
  cardElement.querySelector('.popup__text--time').textContent = ad.offer.checkin && ad.offer.checkout ?
    `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` : '';
  const featureList = cardElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  if (ad.offer.features) {
    const featuresElements = createFeatures(ad.offer.features);
    featureList.appendChild(featuresElements);
  }
  cardElement.querySelector('.popup__description').textContent = ad.offer.description || '';
  const photosList = cardElement.querySelector('.popup__photos');
  photosList.innerHTML = '';
  if (ad.offer.photos) {
    const photoElements = createPhotos(ad.offer.photos);
    photosList.appendChild(photoElements);
  }
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar || '';

  [...cardElement.children].forEach((child) => {
    if (!child.innerHTML) {
      child.remove();
    }
  });

  return cardElement;
};

export {createCard};

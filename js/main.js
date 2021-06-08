const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger();

const getRandomFractionNumber = function (min, max, fractionalPart) {
  return +((Math.random() * (max - min + 1) + min).toFixed(fractionalPart));
};

getRandomFractionNumber();

const SIMILAR_ADVERTS_COUNT = 10;

const TITLES = [
  'Лучший отель, просто лучший',
  'Медовый',
  'Маяк',
  'Турист',
  'Береговой',
  'Отель Бориса',
  'Redison',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const CHECK = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION = [
  'Всегда прохладно и убрано!',
  '5 звезд шика и комфорта',
  'Спокойный отель для каждого',
  'Отель для больших семей, скучно не будет',
  'Отель для отдыха с домашними животными',
  'Первая береговая линия, бассейн с подогревом',
];

const LOCATION_RANGE_LAT = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const LOCATION_RANGE_LNG = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const quantityAvatars = {
  MIN: 1,
  MAX: 8,
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length -1)];
};

const createAdvert = () => {
  return {
    author: createAvatar(getRandomInteger(quantityAvatars.MIN, quantityAvatars.MAX)),
    offer: createOffer(),
    location: crateLocation(),
  }
}

const createAvatar = (number) => {
  return {
    avatar: 'img/avatars/user0' + (number) + '.png'
  };
};

const createOffer = () => {
  return {
    title: getRandomArrayElement(TITLES),
    adress: (location.x, location.y),
    price: getRandomInteger(1000, 5000),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomInteger(1, 4),
    guests: getRandomInteger(1, 4),
    checkin: getRandomArrayElement(CHECK),
    checkout: getRandomArrayElement(CHECK),
    features: getRandomArrayElement(FEATURES),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getRandomArrayElement(PHOTOS)
  };
};

const location = () => {
  return {
    lat: getRandomFractionNumber(LOCATION_RANGE_LAT.MIN, LOCATION_RANGE_LAT.MAX, 5),
    lng: getRandomFractionNumber(LOCATION_RANGE_LNG.MIN, LOCATION_RANGE_LNG.MAX, 5)
  }
};

const similarAdvert = new Array(SIMILAR_ADVERTS_COUNT).fill(null).map(() => createAdvert());

//console.log(similarAdvert);

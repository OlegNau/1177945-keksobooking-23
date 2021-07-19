const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelectorAll('.map__checkbox');

const DEFAULT_VALUE = 'any';

const priceValue = {
  'any': {
    MIN: 0,
    MAX: Infinity,
  },
  'low':  {
    MIN: 0,
    MAX: 10000,
  },
  'middle': {
    MIN: 1000,
    MAX: 5000,
  },
  'high': {
    MIN: 5000,
    MAX: Infinity,
  },
};

const checkType = (adverts) => typeFilter.value === DEFAULT_VALUE || adverts === typeFilter.value;
const checkPrice = (adverts) => priceFilter.value === DEFAULT_VALUE || (adverts >= priceValue[priceFilter.value].MIN && adverts <= priceValue[priceFilter.value].MAX);
const checkRooms = (adverts) => roomsFilter.value === DEFAULT_VALUE || adverts === Number(roomsFilter.value);
const checkGuests = (adverts) => guestsFilter.value === DEFAULT_VALUE || adverts === Number(guestsFilter.value);

const checkFeatures = (features = []) => {
  const checkedFeatures = [];
  featuresFilter.forEach((feature) => {
    if (feature.checked) {
      checkedFeatures.push(feature.value);
    }
  });
  return checkedFeatures.every((checkedFeature) => features.includes(checkedFeature));
};


const getCheckedOption = (adverts) => checkType(adverts.offer.type) && checkPrice(adverts.offer.price) && checkRooms(adverts.offer.rooms) && checkGuests(adverts.offer.guests) && checkFeatures(adverts.offer.features);

export {getCheckedOption};

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

const getCheckedType = (adverts) => typeFilter.value === DEFAULT_VALUE || typeFilter.value === adverts.offer.type;
const getCheckedPrice = (adverts) => priceFilter.value === DEFAULT_VALUE || (adverts.offer.price >= priceValue[priceFilter.value].MIN && adverts.offer.price <= priceValue[priceFilter.value].MAX);
const getCheckedRooms = (adverts) => roomsFilter.value === DEFAULT_VALUE || adverts.offer.rooms === Number(roomsFilter.value);
const getCheckedGuests = (adverts) => guestsFilter.value === DEFAULT_VALUE || adverts.offer.guests === Number(guestsFilter.value);

const getCheckedFeatures = (advert) => {
  const checkedFeatures = [];
  featuresFilter.forEach((feature) => {
    if (feature.checked) {
      checkedFeatures.push(feature.value);
    }
  });
  return checkedFeatures.every((checkedFeature) => {
    if (advert.offer.features) {
      return advert.offer.features.includes(checkedFeature);
    }
  });
};


const getCheckedOption = (adverts) => getCheckedType(adverts) && getCheckedPrice(adverts) && getCheckedRooms(adverts) && getCheckedGuests(adverts) && getCheckedFeatures(adverts);

export {getCheckedOption};

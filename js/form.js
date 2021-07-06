const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const roomsNumber = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
const formButton = adForm.querySelector('.ad-form__submit');
const typeLodging = adForm.querySelector('#type');
const priceLidging = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const guestRestrictions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const minPriseLodging = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const deactivateForm = () => {
  adForm.classList.add('.ad-form--disabled');
  for (let index = 0; index < formFieldsets.length; index++) {
    formFieldsets.disabled = true;
  }
};

const deactivateFiltersForm = () => {
  mapFeatures.disabled = true;
  mapFilters.classList.add('.map__filters--disabled');
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter.disabled = true;
  }
};

const activateForm = () => {
  adForm.classList.remove('.ad-form--disabled');
  for (let index = 0; index < formFieldsets.length; index++) {
    formFieldsets.disabled = false;
  }
};

const activateFiltersForm = () => {
  mapFilters.classList.remove('.map__filters--disabled');
  mapFeatures.disabled = false;
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter.disabled = false;
  }
};

const validateGuestNumber = () => {
  const roomsValue = +roomsNumber.value;
  const guestsValue = +guestsNumber.value;
  const availableValues = guestRestrictions[roomsValue];
  if (availableValues.includes(guestsValue)) {
    guestsNumber.setCustomValidity('');
  } else {
    guestsNumber.setCustomValidity('Недопустимое количество гостей');
  }
};

const disableGuestOptions = () => {
  const roomsValue = +roomsNumber.value;
  const availableValues = guestRestrictions[roomsValue];
  Array.from(guestsNumber.options).forEach((option) => {
    option.disabled = !availableValues.includes(+option.value);
  });
};

const getMinPriceLodging = (tupeOfLodging) => {
  switch (tupeOfLodging) {
    case 'bungalow':
      return minPriseLodging.bungalow;
    case 'flat':
      return minPriseLodging.flat;
    case 'hotel':
      return minPriseLodging.hotel;
    case 'house':
      return minPriseLodging.house;
    case 'palace':
      return minPriseLodging.palace;
  }
};

const insertMinPrise = () => {
  const minPrice = getMinPriceLodging(typeLodging.value);
  priceLidging.min = minPrice;
  priceLidging.placeholder = minPrice;
};

const syncTime = (toOption, fromOption) => {
  fromOption.value = toOption.value;
};

syncTime(timeIn, timeOut);

timeIn.addEventListener('change', () => {
  syncTime(timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  syncTime(timeOut, timeIn);
});


window.addEventListener('load', () => {
  validateGuestNumber();
  disableGuestOptions();
});

roomsNumber.addEventListener('change', () => {
  validateGuestNumber();
  disableGuestOptions();
});

typeLodging.addEventListener('change', () => {
  insertMinPrise();
});

formButton.addEventListener('click', () => validateGuestNumber());

export{deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm};


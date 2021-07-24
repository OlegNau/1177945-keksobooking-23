const guestRestrictions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MinPriceLodging = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const mapFeatures = mapFilter.querySelector('.map__features');
const roomsNumber = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
const formButton = adForm.querySelector('.ad-form__submit');
const typeLodging = adForm.querySelector('#type');
const priceLodging = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  formFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

const deactivateFiltersForm = () => {
  mapFeatures.disabled = true;
  mapFilter.classList.add('map__filters--disabled');
  mapFilters.forEach((element) => {
    element.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

const activateFiltersForm = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFeatures.disabled = false;
  mapFilters.forEach((element) => {
    element.disabled = false;
  });
};

const deleteBorderError = () => {
  const validInputs = adForm.querySelectorAll('input:not(:invalid), select:not(:invalid)');

  validInputs.forEach((element) => {
    element.classList.remove('ad-form__element--invalid-input');
  });
};

const validateGuestNumber = () => {
  const roomsValue = +roomsNumber.value;
  const guestsValue = +guestsNumber.value;
  const availableValues = guestRestrictions[roomsValue];
  const message = availableValues.includes(guestsValue) ? '' : 'Недопустимое количество гостей';
  guestsNumber.setCustomValidity(message);
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
      return MinPriceLodging.BUNGALOW;
    case 'flat':
      return MinPriceLodging.FLAT;
    case 'hotel':
      return MinPriceLodging.HOTEL;
    case 'house':
      return MinPriceLodging.HOUSE;
    case 'palace':
      return MinPriceLodging.PALACE;
  }
};

const setAddress = (address) => {
  addressInput.value = `${address.lat}, ${address.lng}`;
};

const insertMinPrise = () => {
  const minPrice = getMinPriceLodging(typeLodging.value);
  priceLodging.min = minPrice;
  priceLodging.placeholder = minPrice;
};

const resetFilters = () => {
  mapFilter.reset();
  adForm.reset();
  disableGuestOptions();
};

const setResetCallback = (callback) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    callback();
  });
};

const setSubmitCallback = (callback) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    callback(new FormData(adForm));
  });
};

const setChangeFiltersCallback = (callback) => {
  mapFilter.addEventListener('change', () => callback());
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
  deleteBorderError();
});

guestsNumber.addEventListener('change', () => {
  validateGuestNumber();
  deleteBorderError();
});

typeLodging.addEventListener('change', () => {
  insertMinPrise();
});

adForm.addEventListener('input', () => {
  deleteBorderError();
});

const addBorderError = () => {
  const invalidInputs = adForm.querySelectorAll('input:invalid, select:invalid');
  invalidInputs.forEach((element) => {
    element.classList.add('ad-form__element--invalid-input');
  });
};

formButton.addEventListener('click', () => {
  validateGuestNumber();
  addBorderError();
});

insertMinPrise();

export{deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters, setAddress, setResetCallback,  setSubmitCallback, setChangeFiltersCallback};


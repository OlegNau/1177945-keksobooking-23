import {sendData} from './fetch.js';

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
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
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

const DELAY = 500;

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let index = 0; index < formFieldsets.length; index++) {
    formFieldsets.disabled = true;
  }
};

const deactivateFiltersForm = () => {
  mapFeatures.disabled = true;
  mapFilters.classList.add('map__filters--disabled');
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter.disabled = true;
  }
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let index = 0; index < formFieldsets.length; index++) {
    formFieldsets.disabled = false;
  }
};

const activateFiltersForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
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

const setAddress = (address) => {
  addressInput.value = `${address.lat}, ${address.lng}`;
};

const insertMinPrise = () => {
  const minPrice = getMinPriceLodging(typeLodging.value);
  priceLidging.min = minPrice;
  priceLidging.placeholder = minPrice;
};

const resetFilters = () => {
  mapFilters.reset();
  adForm.reset();
};

const setResetCallback = (callback) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    callback();
  });
};



const setSubmitCallback = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData (
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

const setChangeFiltersCallback = (callback) => {
  mapFilters.addEventListener('change', () => callback());
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

const getValidElements = () => {
  let validInputs = document.querySelectorAll('input:not(:invalid)');
  let validSelects = document.querySelectorAll('select:not(:invalid)');
  for (let index = 0; index < validInputs.length; index++) {
    validInputs[index].classList.remove('ad-form__element--invalidinput');
  };
  for (let index = 0; index < validSelects.length; index++) {
    validSelects[index].classList.remove('ad-form__element--invalidinput');
  };
};

const getInvalidElements = () => {
  let InvalidInputs = adForm.querySelectorAll('input:invalid')
  let InvalidSelects = adForm.querySelectorAll('select:invalid')
  for (let index = 0; index < InvalidInputs.length; index++) {
    InvalidInputs[index].classList.add('ad-form__element--invalidinput');
  };
  for (let index = 0; index < InvalidSelects.length; index++) {
    InvalidSelects[index].classList.add('ad-form__element--invalidinput');
  };
};

formButton.addEventListener('click', () => {
  validateGuestNumber();
  getInvalidElements();

});

export{deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters, setAddress, setResetCallback,  setSubmitCallback, setChangeFiltersCallback, DELAY};


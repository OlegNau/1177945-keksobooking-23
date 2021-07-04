const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const roomsNumber = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
//const formButton = adForm.querySelector('.ad-form__submit');
const guestRestrictions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [],
};

const deactivateForm = () => {
  adForm.classList.add('.ad-form--disabled');
  for (let index = 0; index < formFieldset.length; index++) {
    formFieldset.disabled = true;
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
  for (let index = 0; index < formFieldset.length; index++) {
    formFieldset.disabled = false;
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
  Array.from(roomsNumber.options).forEach((option) => {
    option.disabled = !availableValues.includes(+option.value);
  });
};

window.addEventListener('load', () => {
  validateGuestNumber();
  disableGuestOptions();
});

roomsNumber.addEventListener('change', () => {
  validateGuestNumber();
  disableGuestOptions();
});

export{deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm};


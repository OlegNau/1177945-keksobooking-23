const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

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

export{deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm};


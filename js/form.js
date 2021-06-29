const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const deactivateForm = () => {
  adForm.classList.add('.ad-form--disabled');
  mapFeatures.setAttribute('disabled', 'disabled');
  mapFilters.classList.add('.map__filters--disabled');
  for (let index = 0; index < formFieldset.length; index++) {
    formFieldset.setAttribute('disabled', 'disabled');
  }
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter.setAttribute('disabled', 'disabled');
  }
};

const activateForm = () => {
  adForm.classList.remove('.ad-form--disabled');
  mapFilters.classList.remove('.map__filters--disabled');
  mapFeatures.removeAttribute('disabled', 'disabled');
  for (let index = 0; index < formFieldset.length; index++) {
    formFieldset.removeAttribute('disabled', 'disabled');
  }
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter.removeAttribute('disabled', 'disabled');
  }
};

document.addEventListener('load', () => {
  activateForm();
});

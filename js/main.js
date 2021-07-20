import './data.js';
import './lodging.js';
import './form.js';
import './filters.js';
import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters,  setAddress, setSubmitCallback, setResetCallback, setChangeFiltersCallback} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback, resetMap, CENTER_TOKYO} from './map.js';
import {debounce} from './util.js';
import {getData, sendData} from './fetch.js';
import {showError, showSuccess, errorShowMessage} from './messages.js';

const DELAY = 500;

deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  activateForm();
  activateFiltersForm();
  setMoveCallback(setAddress);
  setAddress(CENTER_TOKYO);
  getData((offers) => {
    createMarkers(offers);
    const debounceUpdate = debounce(() => createMarkers(offers), DELAY);
    setChangeFiltersCallback(debounceUpdate);
  },
  () => errorShowMessage('Данные не загружены'));
});

setResetCallback(() => {
  resetMap();
  resetFilters();
  setAddress(CENTER_TOKYO);
});

setSubmitCallback((data) => {
  sendData (
    () => showSuccess(),
    () => showError(),
    data,
  );
});

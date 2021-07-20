import './data.js';
import './lodging.js';
import './form.js';
import './map.js';
import './fetch.js';
import './messages.js';
import './filters.js';
import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters,  setAddress, setSubmitCallback, setResetCallback, setChangeFiltersCallback} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback, resetMap, CENTER_TOKYO} from './map.js';
import {debounce} from './util.js';
import {getData} from './fetch.js';
import {showError, showSuccess} from './messages.js';

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
  }, showError);
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

import './data.js';
import './lodging.js';
import './form.js';
import './map.js';
import './fetch.js';
import './messages.js';
import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters,  setAddress, setSubmitCallback, setResetCallback} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback, resetMap, CENTER_TOKYO} from './map.js';
//import {similarAdverts} from './data.js';
import {getData} from './fetch.js';
import {showError, showSuccess} from './messages.js';


deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  activateForm();
  activateFiltersForm();
  setMoveCallback(setAddress);
  setAddress(CENTER_TOKYO);
  getData((offers) => {
    createMarkers(offers);
  }, showError);
});

setResetCallback(() => {
  resetMap();
  resetFilters();
  setAddress(CENTER_TOKYO);
});

setSubmitCallback(showSuccess, showError);

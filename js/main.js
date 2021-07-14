import './data.js';
import './lodging.js';
import './form.js';
import './map.js';
import './fetch.js';
import './messages.js';
import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, setAddress, setSubmitCallback, setResetCallback} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback} from './map.js';
//import {similarAdverts} from './data.js';
import {getData} from './fetch.js';


deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  activateForm();
  activateFiltersForm();
});

setMoveCallback(setAddress);

getData((offers) => {
  createMarkers(offers);
});

setSubmitCallback(() => {
  setResetCallback();
});

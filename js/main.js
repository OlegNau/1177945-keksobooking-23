import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters,  setAddress, setSubmitCallback, setResetCallback, setChangeFiltersCallback} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback, resetMap, MinPriceLodging} from './map.js';
import {getFilteredAds} from "./filters.js";
import {debounce} from './util.js';
import {loadData, sendData} from './fetch.js';
import {showError, showSuccess, errorShowMessage} from './messages.js';

const DELAY = 500;

deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  activateForm();
  activateFiltersForm();
  setMoveCallback(setAddress);
  setAddress(MinPriceLodging);
  loadData((offers) => {
    createMarkers(getFilteredAds(offers));
    const debounceUpdate = debounce(() => createMarkers(offers), DELAY);
    setChangeFiltersCallback(debounceUpdate);
  },
  () => errorShowMessage('Данные не загружены'));
});

setResetCallback(() => {
  resetMap();
  resetFilters();
  setAddress(MinPriceLodging);
});

setSubmitCallback((data) => {
  sendData (
    () => showSuccess(),
    () => showError(),
    data,
  );
});

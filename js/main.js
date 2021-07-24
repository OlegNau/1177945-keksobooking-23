import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, resetFilters,  setAddress, setSubmitCallback, setResetCallback, setChangeFiltersCallback} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback, resetMap, MinPriceLodging, removeMarkers} from './map.js';
import {getFilteredAds} from './filters.js';
import {debounce} from './util.js';
import {loadData, sendData} from './fetch.js';
import {showError, showSuccess, errorShowMessage} from './messages.js';

const DELAY = 500;

deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  setMoveCallback(setAddress);
  setAddress({
    lat: MinPriceLodging.LAT,
    lng: MinPriceLodging.LNG,
  });
  loadData((offers) => {
    activateForm();
    activateFiltersForm();
    removeMarkers();
    createMarkers(getFilteredAds(offers));
    const debounceUpdate = debounce(() => {
      removeMarkers();
      createMarkers(getFilteredAds(offers));
    }, DELAY);
    setChangeFiltersCallback(debounceUpdate);
    setResetCallback(() => {
      resetMap();
      resetFilters();
      createMarkers(getFilteredAds(offers));
      setAddress({
        lat: MinPriceLodging.LAT,
        lng: MinPriceLodging.LNG,
      });
    });
  },
  () => errorShowMessage('Данные не загружены'));
});

setSubmitCallback((data) => {
  sendData (
    () => {
      showSuccess();
      resetMap();
      resetFilters();
      setAddress({
        lat: MinPriceLodging.LAT,
        lng: MinPriceLodging.LNG,
      });
    },
    () => showError(),
    data,
  );
});

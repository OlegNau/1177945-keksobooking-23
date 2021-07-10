import './data.js';
import './lodging.js';
import './form.js';
import './map.js';
import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm, setAddress} from'./form.js';
import {setLoadCallback, createMarkers, setMoveCallback} from './map.js';
import {similarAdverts} from './data.js';

deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  activateForm();
  activateFiltersForm();
});

setMoveCallback(setAddress);

createMarkers(similarAdverts);



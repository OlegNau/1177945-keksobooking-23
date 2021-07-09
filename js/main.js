import './data.js';
import './lodging.js';
import './form.js';
import './map.js';
import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm} from'./form.js';
import {setLoadCallback, createMarkers} from './map.js';
import {similarAdverts} from './data.js';

deactivateForm();
deactivateFiltersForm();

setLoadCallback(() => {
  activateForm();
  activateFiltersForm();
});

createMarkers(similarAdverts);



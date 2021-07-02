import './data.js';
import './lodging.js';
import './form.js';
import {createCard} from './lodging.js';
import {similarAdverts} from './data.js';
import {deactivateForm, deactivateFiltersForm, validateGuestNumber} from'./form.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(createCard(similarAdverts[0]));


document.addEventListener('load', () => {
  deactivateForm();
  deactivateFiltersForm();
  validateGuestNumber();
});

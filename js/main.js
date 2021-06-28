import './data.js';
import './lodging.js';
import {createCard} from './lodging.js';
import {similarAdverts} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(createCard(similarAdverts[0]));

import {deactivateForm, deactivateFiltersForm, activateForm, activateFiltersForm} from'./form.js';

deactivateForm();
deactivateFiltersForm();

const CENTER_TOKYO = {
  lat: 35.6894,
  lng: 139.692,
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    activateFiltersForm();
  })
  .setView({
    lat: CENTER_TOKYO.lat,
    lng: CENTER_TOKYO.lng,
  }, 10);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainPinMarker = L.marker(
  {
    lat: 35.6894,
    lng: 139.692,
  },
  {
    icon: mainPinIcon,
  },
);

const createMarkers = (cards) => {
  cards.forEach((card) => {
    const normalIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: card.location.lat,
        lng: card.location.lng,
      },
      {
        draggable: true,
        icon: normalIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(card);
  });
};


export {createMarkers, mainPinMarker};

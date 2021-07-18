import {createCard} from './lodging.js';
import {getCheckedOption} from './filters.js';

const MAX_ADVERTS = 10;

const CENTER_TOKYO = {
  lat: 35.6894,
  lng: 139.692,
};

const map = L.map('map-canvas')
  .setView({
    lat: CENTER_TOKYO.lat,
    lng: CENTER_TOKYO.lng,
  }, 12);

const setLoadCallback = (callback) => {
  map.whenReady(() => {
    callback();
  });
};

let markers;

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
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const setMoveCallback = (callback) => {
  mainPinMarker
    .on('moveend', (evt) => {
      const latLng = evt.target.getLatLng();
      const address = {lat:`${latLng.lat.toFixed(5)}`, lng:`${latLng.lng.toFixed(5)}`};
      callback(address);
    });
};

const createMarkers = (adverts) => {
  const markersArray = [];

  adverts.forEach((advert) => {
    if (getCheckedOption(advert)) {
      const normalIcon = L.icon({
        iconUrl: './img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(
        {
          lat: advert.location.lat,
          lng: advert.location.lng,
        },
        {
          icon: normalIcon,
        },
      );

      marker.bindPopup(createCard(advert));
      markersArray.push(marker);
    }
  });

  if (markers) {
    markers.clearLayers();
  }

  markers = L.featureGroup(markersArray.slice(0, MAX_ADVERTS)).addTo(map);
};

const resetMap = () => {
  mainPinMarker.setLatLng(
    {
      lat: CENTER_TOKYO.lat,
      lng: CENTER_TOKYO.lng,
    },
  );
  map.setView(
    {
      lat: CENTER_TOKYO.lat,
      lng: CENTER_TOKYO.lng,
    }, 12);
};

export {createMarkers, setLoadCallback, setMoveCallback, resetMap, CENTER_TOKYO};

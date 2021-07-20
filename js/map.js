import {createCard} from './lodging.js';
import {getCheckedOption} from './filters.js';

const MAX_ADVERTS = 10;

const CENTER_TOKYO = {
  lat: 35.6894,
  lng: 139.692,
};
const TOKYO_ZOOM = 12;

const MAIN_ICON_URL = './img/main-pin.svg';
const MAIN_ICON_SIZES = [52, 52];
const MAIN_ANCHOR_SIZES = [26, 52];
const NORMAL_ICON_URL = './img/pin.svg';
const NORMAL_ICON_SIZES = [40, 40];
const NOPMAL_ANCHOR_SIZES = [20, 40];


const map = L.map('map-canvas')
  .setView({
    lat: CENTER_TOKYO.lat,
    lng: CENTER_TOKYO.lng,
  }, TOKYO_ZOOM);

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
    iconUrl: MAIN_ICON_URL,
    iconSize: MAIN_ICON_SIZES,
    iconAnchor: MAIN_ANCHOR_SIZES,
  },
);

const mainPinMarker = L.marker(
  {
    lat: CENTER_TOKYO.lat,
    lng: CENTER_TOKYO.lng,
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
        iconUrl: NORMAL_ICON_URL,
        iconSize: NORMAL_ICON_SIZES,
        iconAnchor: NOPMAL_ANCHOR_SIZES,
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
    }, TOKYO_ZOOM);
};

export {createMarkers, setLoadCallback, setMoveCallback, resetMap, CENTER_TOKYO};

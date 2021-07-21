import {createCard} from './create-card.js';

const TOKYO_ZOOM = 12;

const MAIN_ICON_URL = './img/main-pin.svg';
const MAIN_ICON_SIZES = [52, 52];
const MAIN_ANCHOR_SIZES = [26, 52];
const NORMAL_ICON_URL = './img/pin.svg';
const NORMAL_ICON_SIZES = [40, 40];
const NORMAL_ANCHOR_SIZES = [20, 40];

const MinPriceLodging = {
  LAT: 35.6894,
  LNG: 139.6917,
};

const map = L.map('map-canvas')
  .setView({
    lat: MinPriceLodging.LAT,
    lng: MinPriceLodging.LNG,
  }, TOKYO_ZOOM);

const setLoadCallback = (callback) => {
  map.whenReady(() => {
    callback();
  });
};

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
    lat: MinPriceLodging.LAT,
    lng: MinPriceLodging.LNG,
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

const markersLayerGroup = L.featureGroup().addTo(map);

const createMarkers = (adverts) => {
  adverts.forEach((advert) => {
    const normalIcon = L.icon({
      iconUrl: NORMAL_ICON_URL,
      iconSize: NORMAL_ICON_SIZES,
      iconAnchor: NORMAL_ANCHOR_SIZES,
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
    marker.addTo(markersLayerGroup);
  });
};

const removeMarkers = () => {
  markersLayerGroup.clearLayers();
};

const resetMap = () => {
  mainPinMarker.setLatLng(
    {
      lat: MinPriceLodging.LAT,
      lng: MinPriceLodging.LNG,
    },
  );
  map.setView(
    {
      lat: MinPriceLodging.LAT,
      lng: MinPriceLodging.LNG,
    }, TOKYO_ZOOM);
};

export {createMarkers, setLoadCallback, setMoveCallback, resetMap, MinPriceLodging, removeMarkers};

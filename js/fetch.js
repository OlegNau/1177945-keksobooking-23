import {showError, showSeccess} from './messages.js';

const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((ads) => onSuccess(ads))
    .catch(() => onError());
};

const sendData = (onSuccess, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).
    then((response) => {
      if (!response.ok) {
        onSuccess();
        showSeccess();
      }
      showError();
    })
    .catch(() => showError());
};

export {getData, sendData};

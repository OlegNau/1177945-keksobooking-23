import {isEscEvent} from './util.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');

const seccessTamplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.errror');
  errorMessage.remove();
};

const onEscErrorPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    document.removeEventListener('keydown', onEscErrorPress);
  }
};

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

const showError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  document/addEventListener('keydown', onEscErrorPress);
};


const closeSuccess = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
};

const onEscSuccessPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    document.removeEventListener('keydown', onEscSuccessPress);
  }
};

const onSuccessButtonClick = (evt) => {
  evt.preventDefault();
  closeSuccess();
};

const showSeccess = () => {
  const successMessage = seccessTamplate.cloneNode(true);
  document.body.appendChild(successMessage);
  document.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onEscSuccessPress);
};

export {showError, showSeccess};


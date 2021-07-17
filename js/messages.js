import {isEscEvent} from './util.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const seccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
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
  const errorButoon = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage);
  errorButoon.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onEscErrorPress);
};

const closeSuccess = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
};

const onEscSuccessPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccess();
    document.removeEventListener('keydown', onEscSuccessPress);
  }
};

const onSuccessButtonClick = (evt) => {
  evt.preventDefault();
  closeSuccess();
};

const showSuccess = () => {
  const successMessage = seccessTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  successMessage.addEventListener('mousedown', onSuccessButtonClick);
  document.addEventListener('keydown', onEscSuccessPress);
};

export {showError, showSuccess};


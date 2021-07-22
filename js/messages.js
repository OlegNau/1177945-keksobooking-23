import {isEscEvent} from './util.js';

const ERROR_TIME = 5000;

const errorShowMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'absolute';
  messageContainer.style.zIndex = '999';
  messageContainer.style.top = '0';
  messageContainer.style.left = '0';
  messageContainer.style.right = '0';
  messageContainer.style.padiing = '30px 30px';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.fontWeight = 'bold';
  messageContainer.style.color = '#FF0000';
  messageContainer.style.backgroundColor = 'rgba(255,255,255, 0.5)';

  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, ERROR_TIME);
};

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successTemplate = document.querySelector('#success')
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
  document.removeEventListener('keydown', onEscErrorPress);
};

const showError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  errorMessage.addEventListener('click', onErrorButtonClick);
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
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  successMessage.addEventListener('mousedown', onSuccessButtonClick);
  document.addEventListener('keydown', onEscSuccessPress);
};

export {showError, showSuccess, errorShowMessage};


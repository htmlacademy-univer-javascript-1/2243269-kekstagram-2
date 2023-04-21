import {isEscapeKey} from './util.js';
import {sendData} from './serverConnection.js';

const photoForm = document.querySelector('.img-upload__form');
const uploadedPhoto = photoForm.querySelector('#upload-file');
const upCansel = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('.img-upload__submit');

const onUploadPhotoInChange = (evt) => {
  if (evt.target.value) {
    openUploadOverlay();
  }
};

const onUploadPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
    evt.target.value = '';
    evt.target.blur();
  }
};

const onUploadCansel = () => {
  closeUploadOverlay();
};

function openUploadOverlay() {
  const changePhoto = photoForm.querySelector('.img-upload__overlay');
  changePhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  upCansel.addEventListener('click', onUploadCansel);
}

function closeUploadOverlay() {
  const changePhoto = photoForm.querySelector('.img-upload__overlay');
  changePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  upCansel.removeEventListener('click', onUploadCansel);

  uploadedPhoto.value = null;
}

uploadedPhoto.addEventListener('change', onUploadPhotoInChange);

const pristine = new Pristine(photoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-text',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const errorMessage = document.querySelector('#error');
const errorWindow = errorMessage.cloneNode(true).content;
const errorPlace = errorWindow.querySelector('.error');
const errorFragment = document.createDocumentFragment();

const errorButton = errorWindow.querySelector('.error__button');

const closeErrorMessage = () => {
  document.body.classList.remove('modal-open');
  errorPlace.classList.add('hidden');
  photoForm.classList.remove('hidden');
};

const onEroorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    photoForm.classList.remove('hidden');
  }
};

const onSendFail = () => {
  photoForm.classList.add('hidden');
  errorFragment.appendChild(errorWindow);
  document.body.append(errorFragment);

  document.body.classList.remove('modal-open');
  errorPlace.classList.remove('hidden');

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEroorMessageEscKeydown);
  document.addEventListener('click', closeErrorMessage);
};

const successMessage = document.querySelector('#success');
const successWindow = successMessage.cloneNode(true).content;
const successPlace = successWindow.querySelector('.success');
const successFragment = document.createDocumentFragment();

const successButton = successWindow.querySelector('.success__button');

const closeSuccessMessage = () => {
  document.body.classList.remove('modal-open');
  successPlace.classList.add('hidden');
  photoForm.classList.remove('hidden');
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    photoForm.classList.remove('hidden');
  }
};

const onSuccessMessage = () => {
  photoForm.classList.add('hidden');
  successFragment.appendChild(successWindow);
  document.body.append(successFragment);

  document.body.classList.remove('modal-open');
  successPlace.classList.remove('hidden');

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', closeSuccessMessage);
};

const setUserFormSubmit = (onSuccess) => {
  photoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          onSuccessMessage();
          unblockSubmitButton();
        },
        () => {
          onSendFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};


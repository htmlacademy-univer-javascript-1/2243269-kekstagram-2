import {isEscapeKey, showAlert} from './util.js';
import {sendData} from './serverConnection.js';
import {setNoneFilter} from './redactPhoto.js';
import {pristine} from './validatePictForm.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoForm = document.querySelector('.img-upload__form');
const uploadedPhoto = photoForm.querySelector('#upload-file');
const upCansel = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const formOverlay = document.querySelector('.img-upload__overlay');

const redactedPhotoContainer = document.querySelector('.img-upload__preview');
const redactedPhoto = redactedPhotoContainer.children[0];
const changedValue = document.querySelector('.scale__control--value');

const errorMessage = document.querySelector('#error');
const errorWindow = errorMessage.cloneNode(true).content;
const errorPlace = errorWindow.querySelector('.error');
const errorFragment = document.createDocumentFragment();

const errorButton = errorWindow.querySelector('.error__button');

const successMessage = document.querySelector('#success');
const successWindow = successMessage.cloneNode(true).content;
const successPlace = successWindow.querySelector('.success');
const successFragment = document.createDocumentFragment();

const successButton = successWindow.querySelector('.success__button');

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const tagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const onUploadPhotoInChange = (evt) => {
  if (evt.target.value) {
    evt.preventDefault();
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

function openUploadOverlay() {
  changedValue.value = '100%';
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  upCansel.addEventListener('click', closeUploadOverlay);
}

function closeUploadOverlay() {
  setNoneFilter();
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  upCansel.removeEventListener('click', closeUploadOverlay);

  formOverlay.classList.add('hidden');
  uploadedPhoto.value = null;
  uploadedPhoto.blur();
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onEroorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    evt.target.value = '';
    evt.target.blur();
    changedValue.value = '100%';
  }
};

function closeErrorMessage() {
  document.body.classList.remove('modal-open');
  errorPlace.classList.add('hidden');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  upCansel.addEventListener('click', closeUploadOverlay);

  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onEroorMessageEscKeydown);
  document.removeEventListener('click', closeErrorMessage);

  formOverlay.classList.remove('hidden');
}

const onSendFail = () => {
  formOverlay.classList.add('hidden');
  errorFragment.appendChild(errorWindow);
  document.body.appendChild(errorFragment);

  document.body.classList.add('modal-open');
  errorPlace.classList.remove('hidden');

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEroorMessageEscKeydown);
  document.addEventListener('click', closeErrorMessage);

  upCansel.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    evt.target.value = '';
    evt.target.blur();
  }
};

function closeSuccessMessage() {
  document.body.classList.remove('modal-open');
  successPlace.classList.add('hidden');
  setNoneFilter();
  const tagPlacer = document.querySelector('.text__hashtags');
  const commentPlacer = document.querySelector('.text__description');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  upCansel.addEventListener('click', closeUploadOverlay);

  submitButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', closeSuccessMessage);

  uploadedPhoto.value = null;
  uploadedPhoto.blur();
  tagPlacer.value = null;
  commentPlacer.value = null;
}

const onSuccessMessage = () => {
  formOverlay.classList.add('hidden');
  successFragment.appendChild(successWindow);
  document.body.append(successFragment);

  document.body.classList.remove('modal-open');
  successPlace.classList.remove('hidden');

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', closeSuccessMessage);

  upCansel.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  const originButton = document.querySelector('#effect-none');
  originButton.checked = true;
};

function setUserFormSubmit(onSuccess) {
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
}
uploadedPhoto.addEventListener('change', onUploadPhotoInChange);

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    redactedPhoto.src = URL.createObjectURL(file);
  } else {
    formOverlay.classList.add('hidden');
    showAlert('Неправильный тип файла', 5000, 1);
  }
});

tagInput.addEventListener('click', (evt) => {
  evt.stopPropagation();
  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  document.body.classList.add('modal-open');
});

commentInput.addEventListener('click', (evt) => {
  evt.stopPropagation();
  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  document.body.classList.add('modal-open');
});

document.body.addEventListener('click', () => {
  document.addEventListener('keydown', onUploadPhotoEscKeydown);
});

export {setUserFormSubmit};


import {isEscapeKey} from './util.js';

const photoForm = document.querySelector('.img-upload__form');
const uploadedPhoto = photoForm.querySelector('#upload-file');
const upCansel = document.querySelector('#upload-cancel');

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

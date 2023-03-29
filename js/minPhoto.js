import {showBigPhoto} from './showBigPhoto.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture');

export function addPhotoMin(description) {
  const photoFragment = document.createDocumentFragment();
  for (const item of description) {
    const photo = photoTemplate.cloneNode(true).content;
    photo.querySelector('.picture__img').src = item.url;
    photo.querySelector('.picture__img').addEventListener('click', (ev) => {
      ev.preventDefault();
      showBigPhoto(item);
    });
    photo.querySelector('.picture__likes').textContent = item.likes;
    photo.querySelector('.picture__comments').textContent = item.comments.length;
    photoFragment.appendChild(photo);
  }
  photoContainer.appendChild(photoFragment);
}
